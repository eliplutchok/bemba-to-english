import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function formatModelName(name) {
  return name
    .toLowerCase()
    .replace(/\./g, '_') // Replace periods with underscores
    .replace(/\s+/g, '_'); // Replace spaces with underscores
}

function ModelComparison() {
  const { model1, model2 } = useParams();
  const decodedModel1 = decodeURIComponent(model1);
  const decodedModel2 = decodeURIComponent(model2);

  const [battlesData, setBattlesData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the compiled_battles.json data
        const response = await fetch('/data/compiled_battles.json');
        const testData = await response.json();

        // Fetch model data using formatted names
        const [model1DataResponse, model2DataResponse] = await Promise.all([
          fetch(`/data/${formatModelName(decodedModel1)}.json`),
          fetch(`/data/${formatModelName(decodedModel2)}.json`),
        ]);

        const model1Data = await model1DataResponse.json();
        const model2Data = await model2DataResponse.json();

        // Process battles data
        const battles = [];

        // Iterate over each ID in test data
        for (const [id, battleInfo] of Object.entries(testData)) {
          // For each metric, check if there's a battle between model1 and model2
          const metrics = [
            'judgment_battles',
            'bert_score_battles',
            'text_embedding_ada_002_battles',
            'consistency_battles',
          ];

          const battleEntry = {
            id: id.toString(), // Ensure ID is a string
            bemba_sentences: '',
            model1_translation: '',
            model2_translation: '',
          };

          // Get the original Bemba sentences
          battleEntry.bemba_sentences =
            model1Data.data[id]?.joined_bemba_sentences || '';

          // Get the translations
          battleEntry.model1_translation =
            model1Data.data[id]?.[`${model1Data.model_name}_translation`] || '';
          battleEntry.model2_translation =
            model2Data.data[id]?.[`${model2Data.model_name}_translation`] || '';

          metrics.forEach((metric) => {
            const battlesArray = battleInfo[metric];
            if (battlesArray) {
              const battle = battlesArray.find(
                (b) =>
                  (b.model_1 === model1Data.model_name &&
                    b.model_2 === model2Data.model_name) ||
                  (b.model_2 === model1Data.model_name &&
                    b.model_1 === model2Data.model_name)
              );
              if (battle) {
                battleEntry[metric] = battle.winner;
              }
            }
          });

          // If we have at least one battle outcome, add it to the list
          if (
            Object.keys(battleEntry).some(
              (key) => metrics.includes(key) && battleEntry[key]
            )
          ) {
            battles.push(battleEntry);
          }
        }

        setBattlesData(battles);
      } catch (error) {
        console.error('Error fetching comparison data:', error);
      }
    };

    fetchData();
  }, [decodedModel1, decodedModel2]);

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'bemba_sentences',
      headerName: 'Bemba Sentences',
      width: 200,
      renderCell: (params) => {
        const rowId = params.row.id.toString();
        const isExpanded = !!expandedRows[rowId];
        const text = params.value;
        return (
          <div
            style={{
              whiteSpace: isExpanded ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      field: 'model1_translation',
      headerName: `${decodedModel1} Translation`,
      width: 200,
      renderCell: (params) => {
        const rowId = params.row.id.toString();
        const isExpanded = !!expandedRows[rowId];
        const text = params.value;
        return (
          <div
            style={{
              whiteSpace: isExpanded ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      field: 'model2_translation',
      headerName: `${decodedModel2} Translation`,
      width: 200,
      renderCell: (params) => {
        const rowId = params.row.id.toString();
        const isExpanded = !!expandedRows[rowId];
        const text = params.value;
        return (
          <div
            style={{
              whiteSpace: isExpanded ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      field: 'judgment_battles',
      headerName: 'Judgment Winner',
      width: 140,
    },
    {
      field: 'bert_score_battles',
      headerName: 'BERT Score Winner',
      width: 140,
    },
    {
      field: 'text_embedding_ada_002_battles',
      headerName: 'Similarity Winner',
      width: 140,
    },
    {
      field: 'consistency_battles',
      headerName: 'Consistency Winner',
      width: 140,
    },
  ];

  // Prepare rows data
  const rows = battlesData.map((battle) => ({
    ...battle,
    id: battle.id.toString(), // Ensure ID is a string
    judgment_battles: battle.judgment_battles || 'N/A',
    bert_score_battles: battle.bert_score_battles || 'N/A',
    text_embedding_ada_002_battles:
      battle.text_embedding_ada_002_battles || 'N/A',
    consistency_battles: battle.consistency_battles || 'N/A',
  }));

  // Function to adjust row height based on expansion state
  const getRowHeight = (params) => {
    const rowId = params.id.toString();
    const isExpanded = !!expandedRows[rowId];
    // Set a higher row height when expanded
    return isExpanded ? 'auto' : null;
  };

  // Handle row click to toggle expansion
  const handleRowClick = (params) => {
    const rowId = params.id.toString();
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        style={{ 
          marginBottom: '10px',
          fontWeight: 'bold',
          color: '#A9A9A9',
        }}
      >
        {decodedModel1} Vs. {decodedModel2}
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <div style={{ height: '600px', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowHeight={getRowHeight}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 100 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'rgba(235,235,235,0.7)',
              },
              '& .MuiDataGrid-cell': {
                wordWrap: 'break-word',
              },
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
          />
        </div>
      </Paper>
    </Box>
  );
}

export default ModelComparison;