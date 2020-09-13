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

## Connecting with Backend

There will be several input that the front end need to receive from the back end.

#### Data Exploration

- Frontend &rarr; Backend: dataset name
- Backend &rarr; Frontend: tweet dataset with format [{tweet, label}, ..., {tweet, label}]

#### Classification Result

- Frontend &rarr; Backend: dataset name, model name
- Backend &rarr; Frontend: two array
  - Accuracy report: the accuracy in form of [{class, precision, recall, f1score, support}]
  - Distribution report: the classification result in form of [{class, pblack, pwhite, pblack/pwhite}]
- Pipeline: 
  1. Take the model and dataset name
  2. Run the model using the dataset
  3. Send the output out for the graph as {cat1: {prob: [], aaeprob: [], tweetlist: []}, cat2:...}
  4. Calculate the portion of pblack and pwhite for each category