import time
from .twitteraae.code.dialectPrediction import load_model, predict
from .process import dataImporting, dataPreprocessing, buildModel, evaluateModel, vectorize
from flask import Flask 
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
import requests
# from ClassifierModule import Classifier
# from ClassifierModule.ClassifierFunction import tokenize

app = Flask(__name__)
CORS(app)

trained_model = None
prev_dataset = None
preprocess_result = None

# Train model and get the accuracy result
@app.route('/data', methods=['GET', 'POST'])
def get_data():
    # global trained_model
    req_data = request.get_json()

    ##-------------- Start the Model Training ---------------##
    # 1. Import the dataset
    print("Step 1")
    print("Data size: {}".format(len(req_data["data"])))
    data = dataImporting(req_data["data"], 'json')
    # 2. Preprocess the dataset
    print("Step 2")
    preprocessingResult = dataPreprocessing(data)
    # 3. Train a model
    print("Step 3")
    modelResult = buildModel(preprocessingResult)
    # trained_model = modelResult
    # 4. Evaluate the model
    print("Step 4")
    evaluationResult = evaluateModel(modelResult, req_data["label"])
    print("Result is obtained")

    response = jsonify(evaluationResult)

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Train model if there is no model saved/there is new ddataset and get prediction from it
@app.route('/predict', methods=['GET', 'POST'])
def get_prediction():
    global trained_model
    global prev_dataset
    global preprocess_result
    req_data = request.get_json()
    ##-------------- Start the Model Training ---------------##
    if trained_model is None or prev_dataset is None or prev_dataset != req_data["data"]:
        # 1. Import the dataset
        print("Step 1")
        print("Data size: {}".format(len(req_data["data"])))
        data = dataImporting(req_data["data"], 'json')
        # 2. Preprocess the dataset
        print("Step 2")
        preprocessingResult = dataPreprocessing(data)
        preprocess_result = preprocessingResult
        # 3. Train a model
        print("Step 3")
        modelResult = buildModel(preprocessingResult)
        prev_dataset = req_data["data"]
        trained_model = modelResult
    # 4. Do the prediction
    print("Step 4")
    model = trained_model['model']
    vectorizer = preprocess_result['vectorizer']
    # print(req_data["data"])
    tweet_list = []
    for entry in req_data["data"]:
        tweet_list.append(entry['tweet'])
    Mt = vectorize(vectorizer, tweet_list)

    predResult = model.predict(Mt)
    predProb = model.predict_proba(Mt)
    print("Result is obtained")

    prediction = {
        'data': req_data["data"],
        'pred_result': predResult.tolist(),
        'pred_prob': predProb.tolist()
    }
    response = jsonify(prediction)

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Classify the tweet in dataset in dataset into AAE/SAE
@app.route('/aae-classify', methods=['GET', 'POST'])
def aae_classify():
    start = time.process_time()
    req_data = request.get_json()
    load_model()
    def aae_label(predict_array):
        if predict_array is None:
            return "SAE"
        if (predict_array[0] > 0.4):
            return "AAE"
        else:
            return "SAE"
    classified_tweet = []
    for entry in req_data["query"]:
        result = predict(entry["tweet"].split())
        if result is None:
            print(entry["tweet"])
            print(result)
        entry["aae_label"] = aae_label(result)
        classified_tweet.append(entry)
        # print(entry)
    # result = predict(req_data["query"].split())
    print(time.process_time() - start)
    response = jsonify({'result': classified_tweet})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    # return "Correct"