from keras.preprocessing import sequence
from collections import Counter
import flask
from flask import request
from flask_cors import CORS
from tensorflow.keras.models import load_model
from bs4 import BeautifulSoup
from selenium import webdriver
from getEmbeddings2 import cleanup
import os


app = flask.Flask(__name__)
CORS(app)


@app.route("/get-post-data", methods=["GET", "POST"])
def predict():
    link = request.get_json()['link']


    options = webdriver.FirefoxOptions()
    options.add_argument('--headless')
    driver = webdriver.Firefox(executable_path="/home/ahmad/Documents/fakenewdetection/webapp/server/drivers/geckodriver-v0.27.0-linux32/geckodriver")
    driver.get(link)

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    divs = soup.find_all('div')
    driver.close()

    post_data = None
    for div in divs:
        class_name = div.get('class')
        if class_name:
            if class_name[0] == '_5pbx' and class_name[1] == 'userContent':
                post_data = div
                break

    print(post_data)
    post_text = post_data.find('p').get_text()
    return flask.jsonify(post_text)


@app.route("/predict", methods=["GET", "POST"])
def predictv1():
    post = request.get_json()['post']
    new_test = cleanup(post)
    print(post)
    cnt = Counter()
    x_train = []
    x_train.append(new_test.split())
    for word in x_train[-1]:
        cnt[word] += 1

    top_words = 5000

    most_common = cnt.most_common(top_words + 1)

    word_bank = {}
    id_num = 1
    for word, freq in most_common:
        word_bank[word] = id_num
        id_num += 1

    for news in x_train:
        i = 0
        while i < len(news):
            if news[i] in word_bank:
                news[i] = word_bank[news[i]]
                i += 1
            else:
                del news[i]

    i = 0
    while i < len(x_train):
        if len(x_train[i]) > 10:
            i += 1
        else:
            del x_train[i]

    max_review_length = 500
    X_train = sequence.pad_sequences(x_train, maxlen=max_review_length)

    print(X_train)
    model = load_model('./model.h5')
    print(model.summary())

    y_pred = model.predict_classes(X_train)
    print(y_pred)
    print("PREDICATION => ", str(y_pred[0][0]))
    return flask.jsonify(str(y_pred[0][0]))

# start the flask app, allow remote connections
app.run(host='0.0.0.0')
