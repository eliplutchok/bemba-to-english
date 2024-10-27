import React, { useState } from 'react';
import {
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  useTheme,
} from '@mui/material';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import battleTotals from './data/battle_totals.json';

function HeadToHead() {
  const theme = useTheme();
  const [battleType, setBattleType] = useState('judgment_battles');

  const battleTypes = Object.keys(battleTotals);

  const handleBattleTypeChange = (event) => {
    setBattleType(event.target.value);
  };

  const prepareHeatmapData = (battleType) => {
    const data = battleTotals[battleType];
    const models = Object.keys(data).sort();
    
    return models.map(model => ({
      id: model.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      data: models.map(opponent => ({
        x: opponent.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        y: parseInt(data[model].wins_against[opponent] || 0),
        value: parseInt(data[model].wins_against[opponent] || 0)
      }))
    }));
  };

  const formatModelName = (name) => {
    return name
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/Gpt/g, 'GPT')
      .replace(/Aya/g, 'AYA')
      .replace(/O1/g, 'O-1');
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: 'calc(100vh - 170px)', // Account for header and footer
      display: 'flex', 
      flexDirection: 'row',
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        width: '250px', 
        mr: 6,
        overflow: 'auto',
        mt: 12,
        ml: 4,
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            mb: 3
          }}
        >
          Head to Head Comparison
        </Typography>

        <FormControl sx={{ width: '100%', mb: 3 }}>
          <InputLabel id="battle-type-select-label">Select Metric</InputLabel>
          <Select
            labelId="battle-type-select-label"
            id="battle-type-select"
            value={battleType}
            label="Select Metric"
            onChange={handleBattleTypeChange}
          >
            {battleTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {formatModelName(type)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ 
        flexGrow: 1,
        height: '95%',
        bgcolor: theme.palette.background.paper 
      }}>
        <ResponsiveHeatMap
          data={prepareHeatmapData(battleType)}
          margin={{ top: 20, right: 20, bottom: 80, left: 80 }}
          valueFormat=">-.0f"
        //   axisTop={{
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 25, // Changed to positive 45 degrees
        //     legend: '',
        //     legendOffset: 46
        //   }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 25, // Changed to positive 45 degrees
            legend: '',
            legendOffset: 46
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40
          }}
          colors={{
            type: 'sequential',
            scheme: 'blues',
            minValue: 0,
            maxValue: 500
          }}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: theme.palette.text.primary,
                  fontSize: 12, // Slightly smaller font
                },
              },
              labels: {
                text: {
                  fill: '#666666',
                  fontSize: 14,
                },
              },
            },
            labels: {
              text: {
                fill: '#666666',
                fontSize: 14,
              },
            },
          }}
          forceSquare={true}
          sizeVariation={0}
          padding={0.3}
          enableLabels={true}
          labelTextColor={{ from: 'color', modifiers: [['darker', 100]] }}
          cellOpacity={1}
          cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
          tooltip={({ xKey, yKey, value }) => (
            <div
              style={{
                padding: 12,
                color: '#ffffff',
                background: '#333333',
              }}
            >
              <strong>{yKey}</strong> won against <strong>{xKey}</strong>: <strong>{value}</strong> times
            </div>
          )}
        />
      </Box>
    </Box>
  );
}

export default HeadToHead;
