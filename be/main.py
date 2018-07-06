import os

from flask import Flask, jsonify
from flask_cors import CORS

import facebook


FACEBOOK_GROUP_ID = '635133846845099'
FACEBOOK_USER_ACCESS_TOKEN = os.environ.get('FACEBOOK_USER_ACCESS_TOKEN')
app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    d = {
        'name': 'Kan'
    }

    return jsonify(d)


@app.route('/g/')
def g():
    graph = facebook.GraphAPI(
        access_token=FACEBOOK_USER_ACCESS_TOKEN,
        version='2.7'
    )

    query_string = 'fields=feed{comments{comments{message,created_time}' \
        ',message,created_time},message,created_time,updated_time}'
    endpoint_url = f'{FACEBOOK_GROUP_ID}?{query_string}'
    feed = graph.request(endpoint_url).get('feed')

    return jsonify(feed)


if __name__ == '__main__':
    app.run(debug=True)
