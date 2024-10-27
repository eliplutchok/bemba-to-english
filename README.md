# Bemba to English

This application provides a comprehensive leaderboard showcasing the relative rankings of models in translating Bemba to English.

## How to Run the App

To run the app locally:

1. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using:

   ```bash
   npm install
   ```

2. **Start the App**: Run the app in development mode with:

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## About

This application provides a comprehensive leaderboard showcasing the relative rankings of models in translating Bemba to English. The models are evaluated using the test set from the [Big C dataset](https://github.com/csikasote/bigc).

### Metrics and Methodologies

The models are evaluated based on several metrics, each designed to assess different aspects of translation quality. The rankings are determined using ELO ratings computed from these metrics.

#### Judgment Battles

In Judgment Battles, models are compared based on human-like judgments rendered by advanced language models (e.g., GPT-4). For each test instance, translations from two models are presented along with the original conversation in English. The language model acts as an evaluator, judging which translation is closer in meaning to the original conversation.

#### BERTScore Battles

BERTScore utilizes contextual embeddings from pretrained BERT models to evaluate the similarity between candidate translations and reference translations.

#### Text Embedding ADA-002 Battles

This metric evaluates models using embeddings from OpenAI's `text-embedding-ada-002` model. By converting texts into high-dimensional embeddings, we can compute cosine similarity scores to assess semantic similarity.

#### Consistency Battles

Consistency Battles measure how consistently a model translates when using a high temperature setting, while keeping all other conditions exactly the same. High temperature introduces randomness in the generation process, and models that produce consistent translations under these conditions are generally considered to be more correct. The assumption is that consistency aligns with correctness, and this has been validated by the alignment of these rankings with those from our other traditional metrics.

### ELO Rating System

The ELO rating system provides a method to rank models based on their relative performance in pairwise battles across all metrics.

## Additional Information

For more detailed information about the methodologies, implementation details, or to access the data and code used in this project, please refer to our [Python Repository](https://github.com/eliplutchok/bemba-to-english-python).

If you have any questions or would like to contribute, feel free to open an issue or submit a pull request.
