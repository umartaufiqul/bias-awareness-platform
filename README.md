# Bias Awareness Platform

This is an interactive platform created to accommodate and help teaching bias awareness in Human-AI interaction.

## Project Structure

This project is built using React and React-Bootstrap.

Like all React project, folder ```src ``` are where all the source codes for the project reside. Under the folder, there are several sub-folders

### **/api** 

The backend server that is used to develop locally. Built using Flask. Some important sub-folders and 

**app.py:** The main flask app. Consist of the following functions:

- get_data → Train model and get the accuracy result
- get_prediction → Train model if there is no model saved/there is new ddataset and get prediction from it
- aae_classify → Classify the tweet in dataset in dataset into AAE/SAE

**process.py:** the functions file used in model training and prediction

**/twitteraae**: tool to classify the tweet int AAE/SAE

### **/src**

The main folder for the platform's frontend, which is built using React and its extensions (Hooks, Redux)

**/actions:** actions used in the React Redux in conjunction with reducers

**/components**: components of the UI that are used in multiple pages. Some of the more important components:

- DataTable: display the dataset in form of table in section 1 and 2
- Result: display the accuracy result of a model trained by the chosen dataset
- MyNavbar: navigation bar of the platform

**/icons**: icons (.svg) that are used throughout the platform

**/pages**: the main pages of the platform. Description of each pages:

- Main: combining all the pages inside React Router
- BiasTesting: the page for section 2: Checking bias
- Introduction: introductory page as the landing page
- Mitigation: the page for section 4: Bias Mitigation
- MitigationNew: the page for section 3: Understanding details and Implementing tasks
- Visualization: the page for section 1: Exploring dataset and model performance
- /mitigation-pages: sub-pages for section 4

**/reducers**: the reducers used in React Redux of this platform in conjunction with the actions

**/styles**: the stylesheets used in the main sections and some of the smaller components



## Using the Platform

### Running the Platform

- Pull into the server Hyungyu has made before

- (If haven't) Uncomment some of the function for production and comment the development version in functions marked as 'CHECK' in file BiasTesting.js and Visualization.js

- Change the variables of local server into the actual server. Here are the variables that needed to be changed and their location

  - server_aae_classify (to classify the tweet based on aae classification): DatasetMitigation.js
  - server_predict (to get prediction from the trained model): PredictMitigation.js
  - server_data ( to get the model accuracy statistic) : Mitigation.js, Visualization.js, DataTable.js

  The reference for each function is in /api/app.py file

### Adding a new page

- A new page can be created in the /src/pages folder
- The link of the new page can be added in the Main.js by importing the page and add it inside the router
- To add the new page in the navbar, go to MyNavbar and add the name of the section in sectionList, and edit the useEffect + goToPage



