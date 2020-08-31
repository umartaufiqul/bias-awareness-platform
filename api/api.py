import time
from flask import Flask 
from flask import jsonify
import json
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