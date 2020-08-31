# Bias Awareness Platform

This is an interactive platform created to accommodate and help teaching bias awareness in Human-AI interaction.

## Project Structure

This project is built using React and React-Bootstrap.

Like all React project, folder ```src ``` are where all the source codes for the project reside. Under the folder, there are several sub-folders

### Pages

The ```pages ``` folder includes an introduction page, five main sections of the platform, and the router (Main.js)

### Components

This folder contain either small components that are used in the main pages, or sub-component of the pages (e.g. Compare and Evaluate tab)

### Icons and Images

These folders contain both images (.jpg or .png files) and icons (.svg files)

### Styles

Each of the main sections and small components have their own CSS file in order to make it easier to manage

## What need to be provided

Before creating the backend for the platform, there are several things that needed to be provided

- 3 different models, each trained with 3 different datasets &rarr; 9 different final models
- Min 2-3 different bias algorithm
- Instruction on how to use bias algorithm
  - Alt 1: ask the student to implement the whole algorithm
  - Alt 2: we provide the code, but they need to know where and how to put it in the skeleton code for the model
- Train a model (that is obviously biased) with the different bias algorithms

### Dataset Found

Due to various method of annotating the text, need to agree on the final categories used. Most use binary categories (hate vs not hate), but some use up to 5 categories

1. A Benchmark Dataset for Learning to Intervene in Online Hate Speech: [Link](https://github.com/jing-qian/A-Benchmark-Dataset-for-Learning-to-Intervene-in-Online-Hate-Speech)
   - Data: ~5000, with 0.8 abuse rate (in reddit ver.)
   - Pros: Beside reddit, this particular dataset also present data from a social platform called Geb. However, it has similar problem 3, with even higher rate of abuse in the platform due to far-right userbase
2. Exploring Hate Speech Detection in Multimodal Publications: [Link](https://gombru.github.io/2019/10/09/MMHS/)
   - Data: ~150k
   - Categories: 1 not hate and 5 hate (divided by type)
   - Need to agree on the categories
3. Fox news comment: [Link](https://github.com/sjtuprog/fox-news-comments)
   - Data: ~1500, with 0.3 abuse rate
   - Problem: fox is famously known as being used widely by conservative, white male in US. Due to this, the racial bias might not exist since there are no POC in the audience (?)
4. Hate speech by Davidson: [Link](https://github.com/t-davidson/hate-speech-and-offensive-language)
   - Data: ~25k, with 0.8 abuse rate
   - Categories: Hate, offensive, and neither

### Bias Mitigation Algorithm to use

We're supposed to  use the algorithm provided by AIF360.

Problem: they use algorithm that requires protected attributes, which doesn't appear in this 

#### Solution 1: Change the topics (e.g income or recidivism)

In case of topic changes, here are some dataset for income:

1. Annual Social and Economic Supplements 2019: [Link](https://www.census.gov/data/datasets/time-series/demo/cps/cps-asec.html)

#### Solution 2: Use text classification specific mitigation algorithm

Instead of using the one used in AIF360, we try to find one that is specifically used in text-classification

1. Adversarial Learning Techniques: [Source](https://dspace.mit.edu/bitstream/handle/1721.1/123131/1128813860-MIT.pdf?sequence=1&isAllowed=y)
   - Adversarial Learning is used to decorrelate protected attribute word vectors with sentiment
2. Stereotypical Bias Removal for Hate Speech Detection Task using Knowledge-based Generalizations: [Source](https://dl.acm.org/doi/pdf/10.1145/3308558.3313504)
   - Use two-stage framework to address stereotypical bias:
     1. Skewed Predicted Class Distribution Bias Detection strategy &rarr; maximum probability of word w belonging to one of the classes excluding neutral class. High value mean w is stereotyped to the class c
     2. Centroid embedding &rarr; replace a bias sensitive word with a dummy tag whose embedding is as follow: find POS tag &rarr; find similar word with similar POS tag &rarr; compute the centroid of top k (5) neighbors, including the original word

However, these algorithm need to be created first, since the code is not provided, like AIF360