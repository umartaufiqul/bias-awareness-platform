import time
from flask import Flask 
from flask import jsonify
import json
import requests
from ClassifierModule import Classifier
from ClassifierModule.ClassifierFunction import tokenize

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    result = {'time': time.time()}
    return jsonify(result)

def tokenize(tweet):
    """Removes punctuation & excess whitespace, sets to lowercase,
    and stems tweets. Returns a list of stemmed tokens."""
    tweet = " ".join(re.split("[^a-zA-Z]*", tweet.lower())).strip()
    #tokens = re.split("[^a-zA-Z]*", tweet.lower())
    tokens = [stemmer.stem(t) for t in tweet.split()]
    return tokens
    
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
    res = requests.post("https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyD31v8RcAgQGLk2m6qmJtR1DP72wElij2c", json=dictToSend)
    return res.json()