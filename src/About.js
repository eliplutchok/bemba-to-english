import React from 'react';
import { Typography, Link, Box } from '@mui/material';

function About() {
  return (
    <Box sx={{ maxWidth: '800px', width: '100%', px: 3, pt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" paragraph>
        This application provides a comprehensive leaderboard showcasing the relative rankings of models in translating Bemba to English. The models are evaluated using the test set from the{' '}
        <Link
          href="https://github.com/csikasote/bigc"
          color="primary.main"
          target="_blank"
          rel="noopener"
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          Big C dataset
        </Link>
        .
      </Typography>
      <Typography variant="body1" paragraph>
        The rankings are determined based on ELO ratings computed across several metrics:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">
            <strong>Judgment Battles:</strong> Models are compared based on human judgments.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>BERT Score Battles:</strong> Models are compared using the BERTScore metric.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Text Embedding ADA 002 Battles:</strong> Models are evaluated using embeddings from OpenAI's <code>text-embedding-ada-002</code> model.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Consistency Battles:</strong> Measures how consistently a model translates across different contexts.
          </Typography>
        </li>
      </ul>
      <Typography variant="body1" paragraph>
        For more detailed information about the methodologies and how the ELO ratings are computed, please refer to our{' '}
        <Link
          href="https://github.com/eliplutchok/bemba-to-english"
          color="primary.main"
          target="_blank"
          rel="noopener"
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          GitHub Repository
        </Link>
        .
      </Typography>
    </Box>
  );
}

export default About;