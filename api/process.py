import pandas as pd
import numpy as np
import pickle
import sys
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
from nltk.stem.porter import *
import string
import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer as VS
from textstat.textstat import *
from sklearn.linear_model import LogisticRegression
from sklearn.feature_selection import SelectFromModel
from sklearn.metrics import classification_report
from sklearn.svm import LinearSVC
import matplotlib.pyplot as plt
import seaborn
import warnings

def dataImporting(dataTitle, type='csv') :
    if type == 'csv':
        df = pd.read_csv(dataTitle, encoding='utf-8')
    elif type == 'json':
        # print(dataTitle)
        df = pd.DataFrame(dataTitle)
    return df

def dataFormatting(df, dataCode) :
    # make sure we have 'tweet' column and 'class' column
    retValue = ''

    if "david" in dataCode['filename'] :
        df = df.rename(columns={"class": "label"})

        retValue = df[['label', 'tweet']]

    elif "hatespeech" in dataCode['filename']  :
        df[['class']] = df[['class']].replace(to_replace='hateful', value='1')
        df[['class']] = df[['class']].replace(to_replace='normal', value='0')

        df = df.rename(columns={"class": "label"})

        retValue = df
    else :
        df[['target']] = df[['target']].replace(to_replace='4', value='1')
        df = df.rename(columns={"target": "label", "text": "tweet"})

        retValue = df[['label', 'tweet']]

    return retValue

def preprocess(text_string):
    """
    Accepts a text string and replaces:
    1) urls with URLHERE
    2) lots of whitespace with one instance
    3) mentions with MENTIONHERE

    This allows us to get standardized counts of urls and mentions
    Without caring about specific people mentioned
    """
    space_pattern = '\s+'
    giant_url_regex = ('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|'
        '[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
    mention_regex = '@[\w\-]+'
    parsed_text = re.sub(space_pattern, ' ', text_string)
    parsed_text = re.sub(giant_url_regex, '', parsed_text)
    parsed_text = re.sub(mention_regex, '', parsed_text)
    return parsed_text

def basic_tokenize(tweet):
    """Same as tokenize but without the stemming"""
    tweet = " ".join(re.split("[^a-zA-Z.,!?]*", tweet.lower())).strip()
    return tweet.split()

def get_feature_array(tweets):
    sentiment_analyzer = VS()
    feats=[]

    for t in tweets:
        feats.append(other_features(t, sentiment_analyzer))
    return np.array(feats)

def count_twitter_objs(text_string):
    """
    Accepts a text string and replaces:
    1) urls with URLHERE
    2) lots of whitespace with one instance
    3) mentions with MENTIONHERE
    4) hashtags with HASHTAGHERE

    This allows us to get standardized counts of urls and mentions
    Without caring about specific people mentioned.

    Returns counts of urls, mentions, and hashtags.
    """
    space_pattern = '\s+'
    giant_url_regex = ('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|'
        '[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
    mention_regex = '@[\w\-]+'
    hashtag_regex = '#[\w\-]+'
    parsed_text = re.sub(space_pattern, ' ', text_string)
    parsed_text = re.sub(giant_url_regex, 'URLHERE', parsed_text)
    parsed_text = re.sub(mention_regex, 'MENTIONHERE', parsed_text)
    parsed_text = re.sub(hashtag_regex, 'HASHTAGHERE', parsed_text)
    return(parsed_text.count('URLHERE'),parsed_text.count('MENTIONHERE'),parsed_text.count('HASHTAGHERE'))

def other_features(tweet, sentiment_analyzer):
    """This function takes a string and returns a list of features.
    These include Sentiment scores, Text and Readability scores,
    as well as Twitter specific features"""

    sentiment = sentiment_analyzer.polarity_scores(tweet)

    words = preprocess(tweet) #Get text only

    syllables = textstat.syllable_count(words)
    num_chars = sum(len(w) for w in words)
    num_chars_total = len(tweet)
    num_terms = len(tweet.split())
    num_words = len(words.split())
    avg_syl = round(float((syllables+0.001))/float(num_words+0.001),4)
    num_unique_terms = len(set(words.split()))

    ###Modified FK grade, where avg words per sentence is just num words/1
    FKRA = round(float(0.39 * float(num_words)/1.0) + float(11.8 * avg_syl) - 15.59,1)
    ##Modified FRE score, where sentence fixed to 1
    FRE = round(206.835 - 1.015*(float(num_words)/1.0) - (84.6*float(avg_syl)),2)

    twitter_objs = count_twitter_objs(tweet)
    retweet = 0
    if "rt" in words:
        retweet = 1
    features = [FKRA, FRE,syllables, avg_syl, num_chars, num_chars_total, num_terms, num_words,
                num_unique_terms, sentiment['neg'], sentiment['pos'], sentiment['neu'], sentiment['compound'],
                twitter_objs[2], twitter_objs[1],
                twitter_objs[0], retweet]
    #features = pandas.DataFrame(features)
    return features

def dataPreprocessing(df) :
    import nltk

    nltk.download('stopwords')
    nltk.download('averaged_perceptron_tagger')
    nltk.download('vader_lexicon')

    tweets=df.tweet

    stopwords = nltk.corpus.stopwords.words("english")

    other_exclusions = ["#ff", "ff", "rt"]
    stopwords.extend(other_exclusions)

    stemmer = PorterStemmer()

    def tokenize(tweet):
        """Removes punctuation & excess whitespace, sets to lowercase,
        and stems tweets. Returns a list of stemmed tokens."""
        tweet = " ".join(re.split("[^a-zA-Z]*", tweet.lower())).strip()
        tokens = [stemmer.stem(t) for t in tweet.split()]
        return tokens

    vectorizer = TfidfVectorizer(
        tokenizer=tokenize,
        preprocessor=preprocess,
        ngram_range=(1, 3),
        stop_words=stopwords,
        use_idf=True,
        smooth_idf=False,
        norm=None,
        decode_error='replace',
        max_features=10000,
        min_df=5,
        max_df=0.75
        )

    warnings.simplefilter(action='ignore', category=FutureWarning)

    #Construct tfidf matrix and get relevant scores
    tfidf = vectorizer.fit_transform(tweets.astype('U').values).toarray()
    vocab = {v:i for i, v in enumerate(vectorizer.get_feature_names())}
    idf_vals = vectorizer.idf_
    idf_dict = {i:idf_vals[i] for i in vocab.values()} #keys are indices; values are IDF scores

    #Get POS tags for tweets and save as a string
    tweet_tags = []
    for t in tweets:
        tokens = basic_tokenize(preprocess(t))
        tags = nltk.pos_tag(tokens)
        tag_list = [x[1] for x in tags]
        tag_str = " ".join(tag_list)
        tweet_tags.append(tag_str)

    #We can use the TFIDF vectorizer to get a token matrix for the POS tags
    pos_vectorizer = TfidfVectorizer(
        tokenizer=None,
        lowercase=False,
        preprocessor=None,
        ngram_range=(1, 3),
        stop_words=None,
        use_idf=False,
        smooth_idf=False,
        norm=None,
        decode_error='replace',
        max_features=5000,
        min_df=5,
        max_df=0.75,
        )

    #Construct POS TF matrix and get vocab dict
    pos = pos_vectorizer.fit_transform(pd.Series(tweet_tags)).toarray()
    pos_vocab = {v:i for i, v in enumerate(pos_vectorizer.get_feature_names())}

    #ow get other features


    other_features_names = ["FKRA", "FRE","num_syllables", "avg_syl_per_word", "num_chars", "num_chars_total", \
                        "num_terms", "num_words", "num_unique_words", "vader neg","vader pos","vader neu", \
                        "vader compound", "num_hashtags", "num_mentions", "num_urls", "is_retweet"]

    feats = get_feature_array(tweets)
    M = np.concatenate([tfidf,pos,feats],axis=1)

    return {
        'vocab': vocab,
        'pos_vocab': pos_vocab,
        'other_features_names': other_features_names,
        'df': df,
        'M': M,
        'y': df['label'].astype(int),
        'vectorizer': (vectorizer, pos_vectorizer),
    };

def vectorize(vectorizer, tweets) :
    v1 = vectorizer[0]
    v2 = vectorizer[1]

    tweet_tags = []
    for t in tweets:
        tokens = basic_tokenize(preprocess(t))
        tags = nltk.pos_tag(tokens)
        tag_list = [x[1] for x in tags]
        tag_str = " ".join(tag_list)
        tweet_tags.append(tag_str)

    tfidf = v1.transform(tweets).toarray()
    pos = v2.transform(pd.Series(tweet_tags)).toarray()
    feats = get_feature_array(tweets)

    return np.concatenate([tfidf,pos,feats],axis=1)

def buildModel(p) :
    # vocab, pos_vocab, other_feature_names,

    vocab = p["vocab"]
    pos_vocab = p["pos_vocab"]
    other_features_names = p["other_features_names"]
    df = p["df"]
    M = p["M"]
    y = p["y"]

    #Finally get a list of variable names
    variables = ['']*len(vocab)
    for k,v in vocab.items():
        variables[v] = k

    pos_variables = ['']*len(pos_vocab)
    for k,v in pos_vocab.items():
        pos_variables[v] = k

    feature_names = variables+pos_variables+other_features_names

    X = pd.DataFrame(M)

    from sklearn.model_selection import train_test_split

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42, test_size=0.1)

    from sklearn.model_selection import StratifiedKFold, GridSearchCV
    from sklearn.pipeline import Pipeline

    pipe = Pipeline(
        [('select', SelectFromModel(LogisticRegression(class_weight='balanced',
                                                  penalty="l1", solver='liblinear', max_iter=1000, C=0.01))),
        ('model', LogisticRegression(class_weight='balanced',penalty='l2', solver='liblinear', max_iter=1000))])

    param_grid = [{}] # Optionally add parameters here

    grid_search = GridSearchCV(pipe,
                           param_grid,
                           cv=StratifiedKFold(n_splits=5,
                                              random_state=42).split(X_train, y_train),
                           verbose=1)

    model = grid_search.fit(X_train, y_train)

    return {
        'model': model,
        'X_test': X_test,
        'y_test': y_test,
		'y_prob': model.predict_proba(X)
    }


def evaluateModel(p, names) :
    model = p['model']
    X_test = p['X_test']
    y_test = p['y_test']

    y_preds = model.predict(X_test)
    y_prob = model.predict_proba(X_test)

    report = classification_report( y_test, y_preds, output_dict=True)

    print(report)


    # from sklearn.metrics import confusion_matrix
    # confusion_matrix = confusion_matrix(y_test,y_preds)
    # matrix_proportions = np.zeros((len(names),len(names)))
    # for i in range(0,len(names)):
    #     matrix_proportions[i,:] = confusion_matrix[i,:]/float(confusion_matrix[i,:].sum())
    # confusion_df = pd.DataFrame(matrix_proportions, index=names,columns=names)
    # plt.figure(figsize=(5,5))
    # seaborn.heatmap(confusion_df,annot=True,annot_kws={"size": 12},cmap='gist_gray_r',cbar=False, square=True,fmt='.2f')
    # plt.ylabel(r'True categories',fontsize=14)
    # plt.xlabel(r'Predicted categories',fontsize=14)
    # plt.tick_params(labelsize=12)

    #Uncomment line below if you want to save the output
    #plt.savefig('confusion.pdf')

    return {
        'report': report,
        'y_preds': y_preds.tolist(),
		'y_prob': y_prob.tolist()
    }
