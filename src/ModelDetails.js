import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function ModelDetails() {
  const { modelName } = useParams();
  const [modelData, setModelData] = useState(null);

  // State to track expanded rows
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await fetch(`/data/${modelName}.json`);
        const data = await response.json();
        setModelData(data);
      } catch (error) {
        console.error('Error fetching model data:', error);
      }
    };

    fetchModelData();
  }, [modelName]);

  if (!modelData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  // Toggle row expansion
  const handleRowClick = (id) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 3,
        pt: 3,
      }}
    >
      <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" gutterBottom>
          {modelData.model_name} Translations
        </Typography>

        {/* Adjusted Table Container */}
        <Box
          sx={{
            height: 600,
            width: '100%',
            overflow: 'auto',
            mb: 1,
          }}
        >
          <TableContainer component={Paper}>
            <Table stickyHeader={true}>
              <TableHead>
                <TableRow 
                  sx={{ 
                    backgroundColor: 'background.default',
                   
                  }}
                >
                  <TableCell>ID</TableCell>
                  <TableCell>Original (Bemba)</TableCell>
                  <TableCell>Translation</TableCell>
                  <TableCell>BERT Score</TableCell>
                  <TableCell>Similarity Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(modelData.data).map(([id, entry]) => {
                  const isExpanded = expandedRows.includes(id);
                  return (
                    <TableRow
                      key={id}
                      onClick={() => handleRowClick(id)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                        height: isExpanded ? 'auto' : 80,
                        verticalAlign: 'top',
                        
                      }}
                    >
                      <TableCell
                        sx={{
                          height: '100%',
                          verticalAlign: isExpanded ? 'top' : 'middle',
                        }}
                      >
                        {id}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          whiteSpace: isExpanded ? 'normal' : 'nowrap',
                          overflow: isExpanded ? 'visible' : 'hidden',
                          textOverflow: 'ellipsis',
                          height: '100%',
                          verticalAlign: isExpanded ? 'top' : 'middle',
                        }}
                      >
                        {entry.joined_bemba_sentences}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          whiteSpace: isExpanded ? 'normal' : 'nowrap',
                          overflow: isExpanded ? 'visible' : 'hidden',
                          textOverflow: 'ellipsis',
                          height: '100%',
                          verticalAlign: isExpanded ? 'top' : 'middle',
                        }}
                      >
                        {entry[`${modelData.model_name}_translation`]}
                      </TableCell>
                      <TableCell
                        sx={{
                          height: '100%',
                          verticalAlign: isExpanded ? 'top' : 'middle',
                        }}
                      >
                        {entry[`${modelData.model_name}_bertscore`].toFixed(4)}
                      </TableCell>
                      <TableCell
                        sx={{
                          minHeight: isExpanded ? 'auto' : 120,
                          verticalAlign: isExpanded ? 'top' : 'middle',
                        }}
                      >
                        {entry[
                          `${modelData.model_name}_text-embedding-ada-002_similarity`
                        ].toFixed(4)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default ModelDetails;