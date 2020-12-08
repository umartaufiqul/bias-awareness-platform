import time
from .twitteraae.code.dialectPrediction import load_model, predict
from .process import dataImporting, dataPreprocessing, buildModel, evaluateModel
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

@app.route('/data', methods=['GET', 'POST'])
def get_data():
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
    # 4. Evaluate the model
    print("Step 4")
    evaluationResult = evaluateModel(modelResult, req_data["label"])
    print("Result is obtained")

    response = jsonify(evaluationResult)

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

    # return jsonify(length)

@app.route('/time')
def get_current_time():
    result = {'time': time.time()}
    return jsonify(result)

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
    
@app.route('/classifier')
def classify_tweet():
    with open('bogus_data.json') as json_file:
        data = json.load(json_file)
        return data

@app.route('/perspective')
def perspective_api():
    dictToSend = {
        "comment" : {
            "text": "I'm forever thankful for the people that make stupid ass threads of stuff that makes me crack up"
        },
        "requestedAttributes": {
            'TOXICITY': {}
        }
    }
    with open('data1.json') as data_json:
        data = json.load(data_json)
        result = []
        for i in range(20):
            entry = data['tweet'][i]
            curr_entry = {
                "comment" : { "text": entry},
                "requestedAttributes": {'TOXICITY': {}}
            }
            res = requests.post("https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyD31v8RcAgQGLk2m6qmJtR1DP72wElij2c", json=curr_entry)
            test = json.loads(res.text)
            try:
                result.append(test["attributeScores"]["TOXICITY"]["summaryScore"]["value"])
            except:
                continue
        result_json = {"result": result}
        return jsonify(result_json)
    # res = requests.post("https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyD31v8RcAgQGLk2m6qmJtR1DP72wElij2c", json=dictToSend)
    # return res.json()