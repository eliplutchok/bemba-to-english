import React from 'react';
import { Typography, Link, Box } from '@mui/material';

function About() {
  return (
    <Box sx={{ maxWidth: '800px', width: '100%', px: 3, pt: 3, overflowY: 'auto' }}>
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

      <Typography variant="h5" component="h2" gutterBottom>
        Metrics and Methodologies
      </Typography>
      <Typography variant="body1" paragraph>
        The models are evaluated based on several metrics, each designed to assess different aspects of translation quality. The rankings are determined using ELO ratings computed from these metrics. Below is a detailed explanation of each metric and the ELO rating system.
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom>
        Judgment Battles
      </Typography>
      <Typography variant="body1" paragraph>
        In Judgment Battles, models are compared based on human-like judgments rendered by advanced language models (e.g., GPT-4). For each test instance, translations from two models are presented along with the original conversation in English. The language model acts as an evaluator, judging which translation is closer in meaning to the original conversation.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Process Overview:</strong>
      </Typography>
      <ol>
        <li>
          <Typography variant="body1">
            <strong>Preparing Judgment Prompts:</strong> We use a script to prepare judgment files by merging translations from two models and formatting them into a prompt that includes the original conversation and the two alternate translations.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Obtaining Judgments:</strong> The prepared prompts are fed into a language model which responds with a judgment indicating which translation is better or if they are equally good.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Recording Results:</strong> The judgments are recorded and used to update the models' ELO ratings based on the outcomes.
          </Typography>
        </li>
      </ol>

      <Typography variant="h6" component="h3" gutterBottom>
        BERTScore Battles
      </Typography>
      <Typography variant="body1" paragraph>
        BERTScore utilizes contextual embeddings from pretrained BERT models to evaluate the similarity between candidate translations and reference translations.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Process Overview:</strong>
      </Typography>
      <ol>
        <li>
          <Typography variant="body1">
            <strong>Computing BERTScore:</strong> For each candidate translation, we compute the BERTScore against the corresponding reference translation using the <code>bert_score</code> library. This involves generating embeddings and calculating precision, recall, and F1 scores.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Comparing Models:</strong> Models are compared by their BERTScore F1 scores for each test instance. The model with the higher BERTScore in a pairwise comparison wins the battle.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Updating ELO Ratings:</strong> The outcomes of these battles are used to update the models' ELO ratings.
          </Typography>
        </li>
      </ol>

      <Typography variant="h6" component="h3" gutterBottom>
        Text Embedding ADA-002 Battles
      </Typography>
      <Typography variant="body1" paragraph>
        This metric evaluates models using embeddings from OpenAI's <code>text-embedding-ada-002</code> model. By converting texts into high-dimensional embeddings, we can compute cosine similarity scores to assess semantic similarity.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Process Overview:</strong>
      </Typography>
      <ol>
        <li>
          <Typography variant="body1">
            <strong>Generating Embeddings:</strong> We use the <code>text-embedding-ada-002</code> model to generate embeddings for both the reference translations and the candidate translations.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Calculating Similarity Scores:</strong> Cosine similarity between the embeddings of the reference and candidate translations is computed, resulting in a similarity score for each translation.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Comparing Models:</strong> Similar to BERTScore Battles, models are compared based on their similarity scores, with higher scores indicating better performance.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Updating ELO Ratings:</strong> Results are used to update the ELO ratings accordingly.
          </Typography>
        </li>
      </ol>

      <Typography variant="h6" component="h3" gutterBottom>
        Consistency Battles
      </Typography>
      <Typography variant="body1" paragraph>
        Consistency Battles measure how consistently a model translates when using a high temperature setting, while keeping all other conditions exactly the same. High temperature introduces randomness in the generation process, and models that produce consistent translations under these conditions are generally considered to be more correct. The assumption is that consistency aligns with correctness, and this has been validated by the alignment of these rankings with those from our other traditional metrics.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Process Overview:</strong>
      </Typography>
      <ol>
        <li>
          <Typography variant="body1">
            <strong>Generating Multiple Translations:</strong> For each model, multiple translations are generated for the same input using a high temperature setting, while keeping all other conditions the same.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Preparing Consistency Judgment Prompts:</strong> We prepare prompts that present these multiple translations to an evaluator.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Evaluating Consistency:</strong> A language model evaluates which model produces more consistent translations by comparing the variations. Models that are more consistent under high temperature are considered to be more correct.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Recording Results:</strong> The model deemed more consistent wins the battle, and the results are used to update the ELO ratings.
          </Typography>
        </li>
      </ol>

      <Typography variant="h5" component="h2" gutterBottom>
        ELO Rating System
      </Typography>
      <Typography variant="body1" paragraph>
        The ELO rating system provides a method to rank models based on their relative performance in pairwise battles across all metrics. Each model starts with an initial ELO rating (e.g., 1000), and the ratings are updated based on the outcomes of the battles.
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>ELO Calculation Steps:</strong>
      </Typography>
      <ol>
        <li>
          <Typography variant="body1">
            <strong>Initialization:</strong> All models are assigned an initial ELO rating.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Expected Score Calculation:</strong> For each battle, the expected score for each model is calculated using the formula:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, mb: 1, fontStyle: 'italic' }}>
            Expected Score = 1 / (1 + 10<sup>((Opponent's Rating - Player's Rating) / 400)</sup>)
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Rating Update:</strong> The ELO ratings are updated based on the actual outcome (win, loss, or tie) using:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic' }}>
            New Rating = Current Rating + K × (Actual Score – Expected Score)
          </Typography>
          <Typography variant="body1" paragraph>
            where <strong>K</strong> is a constant (e.g., 16) that determines the sensitivity of the rating changes.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Iterative Updates:</strong> This process is repeated for all battles, leading to a refined ranking of the models.
          </Typography>
        </li>
      </ol>

      <Typography variant="body1" paragraph>
        <strong>Example:</strong>
      </Typography>
      <Typography variant="body1" paragraph>
        If Model A (Rating 1000) defeats Model B (Rating 1000), the expected scores are equal (0.5 each). Model A's new rating becomes 1008, and Model B's becomes 992 (assuming K=16), reflecting Model A's superior performance.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Additional Information
      </Typography>
      <Typography variant="body1" paragraph>
        For more detailed information about the methodologies, implementation details, or to access the data and code used in this project, please refer to our{' '}
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
      <Typography variant="body1" paragraph>
        If you have any questions or would like to contribute, feel free to open an issue or submit a pull request.
      </Typography>
    </Box>
  );
}

export default About;
