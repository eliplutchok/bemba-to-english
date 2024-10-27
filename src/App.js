import React, { useState } from 'react';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  CssBaseline,
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  Box,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import eloRankings from './data/elo_rankings.json';
import hackerLogo from './hacker.png'; // Ensure this path is correct
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import About from './About';

function App() {
  // State to manage the theme mode
  const [mode, setMode] = useState('dark');

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create a theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#FF3737',
      },
      ...(mode === 'light'
        ? {
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: '#000000',
              secondary: '#555555',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#bbbbbb',
            },
          }),
    },
  });

  // Process data to create rows for the DataGrid
  const processData = () => {
    const models = new Set();

    // Collect all model names
    Object.values(eloRankings).forEach((battle) => {
      Object.keys(battle).forEach((model) => {
        models.add(model);
      });
    });

    // Create rows array
    const rows = Array.from(models).map((model, index) => {
      return {
        id: index + 1,
        model: model,
        judgmentBattles: eloRankings.judgment_battles?.[model] || '-',
        bertScoreBattles: eloRankings.bert_score_battles?.[model] || '-',
        textEmbeddingBattles:
          eloRankings.text_embedding_ada_002_battles?.[model] || '-',
        consistencyBattles: eloRankings.consistency_battles?.[model] || '-',
      };
    });

    return rows;
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'model', headerName: 'Model', flex: 1, sortable: true },
    {
      field: 'judgmentBattles',
      headerName: 'Judgment Battles',
      flex: 1,
      type: 'number',
      sortable: true,
    },
    {
      field: 'bertScoreBattles',
      headerName: 'BERT Score Battles',
      flex: 1,
      type: 'number',
      sortable: true,
    },
    {
      field: 'textEmbeddingBattles',
      headerName: 'Text Embedding ADA 002 Battles',
      flex: 1,
      type: 'number',
      sortable: true,
    },
    {
      field: 'consistencyBattles',
      headerName: 'Consistency Battles',
      flex: 1,
      type: 'number',
      sortable: true,
    },
  ];

  const rows = processData();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {/* Main Container */}
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Navigation Bar */}
            <AppBar position="static" color="default" elevation={0}>
              <Toolbar>
                {/* Adjusted logo position */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <img
                    src={hackerLogo}
                    alt="Logo"
                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                  />
                  <Typography variant="h6" color="inherit">
                    Bemba to English
                  </Typography>
                </Box>
                <Link
                  component={RouterLink}
                  to="/"
                  color="primary.main"
                  underline="none"
                  sx={{ mx: 2, '&:hover': { color: 'primary.main' } }}
                >
                  Leaderboard
                </Link>
                <Link
                  component={RouterLink}
                  to="/about"
                  color="primary.main"
                  underline="none"
                  sx={{ mx: 2, '&:hover': { color: 'primary.main' } }}
                >
                  About
                </Link>
                {/* Theme Toggle Button */}
                <IconButton onClick={toggleTheme} color="inherit">
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box
              sx={{
                flex: 1,
                overflow: 'hidden',
                px: 3,
                pt: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <Box sx={{ maxWidth: '800px', width: '100%' }}>
                      <Typography variant="h4" component="h1" gutterBottom>
                        Bemba-to-English LLM Leaderboard
                      </Typography>
                      <Typography variant="body1" paragraph>
                        This is a leaderboard showing the relative rankings of models at
                        translating Bemba to English. The metrics are tested using the
                        test set from the{' '}
                        <Link
                          href="https://github.com/csikasote/bigc"
                          color="primary.main"
                          target="_blank"
                          rel="noopener"
                          sx={{
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          Big C dataset
                        </Link>
                        . If you want more info about the methodologies, read the{' '}
                        <Link
                          component={RouterLink}
                          to="/about"
                          color="primary.main"
                          sx={{
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          About
                        </Link>{' '}
                        page.
                      </Typography>
                      {/* DataGrid Table */}
                      <Box
                        sx={{
                          flex: 1,
                          overflow: 'auto',
                          mb: 2,
                          width: '100%',
                        }}
                      >
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          disableSelectionOnClick
                          sx={{
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            '& .MuiDataGrid-cell': {
                              borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                            '& .MuiDataGrid-columnHeaders': {
                              backgroundColor: theme.palette.background.default,
                              borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                            '& .MuiDataGrid-footerContainer': {
                              backgroundColor: theme.palette.background.default,
                              borderTop: `1px solid ${theme.palette.divider}`,
                            },
                          }}
                          componentsProps={{
                            pagination: { pageSizeOptions: [5, 10, 20] },
                          }}
                        />
                      </Box>
                    </Box>
                  }
                />
                <Route path="/about" element={<About />} />
              </Routes>
            </Box>

            {/* Footer */}
            <Box
              component="footer"
              sx={{
                py: 2,
                textAlign: 'center',
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                &copy; {new Date().getFullYear()} Bemba to English Translation
                Leaderboard
              </Typography>
              <Typography variant="body2">
                <Link
                  href="https://github.com/eliplutchok/bemba-to-english"
                  color="primary.main"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  GitHub Repository
                </Link>
                {' | '}
                <Link
                  href="https://github.com/csikasote/bigc"
                  color="primary.main"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  Big C Dataset
                </Link>
              </Typography>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
