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
import { BrowserRouter as Router, Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import About from './About';
import HeadToHead from './HeadToHead'; // Import the new component
import ModelDetails from './ModelDetails';
import ModelComparison from './ModelComparison'; // Import the new component

function AppContent() {
  const navigate = useNavigate();

  // State to manage the theme mode
  const [mode, setMode] = useState('light');

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
        <Box
          sx={{
            minHeight: '100vh', // Ensure the container covers the viewport height
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Navigation Bar */}
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
              {/* Logo and Title */}
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <img
                  src={hackerLogo}
                  alt="Logo"
                  style={{ width: '40px', height: 'auto', marginRight: '4px', marginBottom: '7px' }}
                />
                <Typography variant="h6" color="inherit">
                  Bemba-to-English
                </Typography>
              </Box>
              {/* Navigation Links */}
              <Link
                component={RouterLink}
                to="/"
                color="primary.main"
                underline="none"
                sx={{
                  mx: 2,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Leaderboard
              </Link>
              <Link
                component={RouterLink}
                to="/head-to-head"
                color="primary.main"
                underline="none"
                sx={{
                  mx: 2,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Head to Head
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="primary.main"
                underline="none"
                sx={{
                  mx: 2,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
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
              flex: 1, // Allow the main content to grow and fill available space
              px: 3,
              pt: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Center content horizontally
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* Container for both paragraph and table */}
                    <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
                      {/* Paragraph Section */}
                      <Box sx={{ mb: 3, mt: 3 }}>
                        <Typography variant="h5" component="h1" gutterBottom>
                          Leaderboard
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
                      </Box>

                      {/* DataGrid Table */}
                      <Box
                        sx={{
                          height: 450,
                          width: '100%',
                          overflow: 'auto',
                          mb: 1,
                        }}
                      >
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          disableSelectionOnClick
                          hideFooter
                          onRowClick={(params) => {
                            navigate(`/model/${params.row.model}`);
                          }}
                          sx={{
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            cursor: 'pointer', // Add pointer cursor
                            '& .MuiDataGrid-row:hover': {
                              backgroundColor: 'action.hover', // Add hover effect
                            },
                            '& .MuiDataGrid-cell': {
                              borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                            '& .MuiDataGrid-columnHeaders': {
                              backgroundColor: theme.palette.background.default,
                              borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                }
              />
              <Route path="/head-to-head" element={<HeadToHead />} />
              <Route path="/about" element={<About />} />
              <Route path="/model/:modelName" element={<ModelDetails />} />
              <Route path="/compare/:model1/:model2" element={<ModelComparison />} />
            </Routes>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              py: 1.5, // Reduced padding
              height: '40px', // Reduced height
              textAlign: 'center',
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ display: 'inline' }}>
              &copy; {new Date().getFullYear()} Bemba to English Translation Leaderboard {' | '}
              <Link
                href="https://github.com/eliplutchok/bemba-to-english"
                underline="hover"
                sx={{ 
                  color: 'text.secondary', // Use grey color
                  '&:hover': {
                    color: 'text.secondary', // Stay grey on hover
                  },
                }}
              >
                GitHub Repository
              </Link>
              {' | '}
              <Link
                href="https://github.com/csikasote/bigc"
                underline="hover"
                sx={{ 
                  color: 'text.secondary', // Use grey color
                  '&:hover': {
                    color: 'text.secondary', // Stay grey on hover
                  },
                }}
              >
                Big C Dataset
              </Link>
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
