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
    query_string = 'fields=feed'
    endpoint_url = f'{FACEBOOK_GROUP_ID}?{query_string}'
    feed = graph.request(endpoint_url).get('feed')

    results = []
    for each in feed.get('data'):
        post = {}
        message = each.get('message')
        if message:
            post['title'] = message
            comment_id = each.get('id')
            query_string = 'fields=comments{like_count,created_time,message}' \
                ',created_time,message'
            endpoint_url = f'{comment_id}?{query_string}'
            comments = graph.request(endpoint_url).get('comments')
            if comments:
                post['comments'] = []
                for comment in comments.get('data'):
                    comment_message = comment.get('message')
                    post['comments'].append(comment_message)

        results.append(post)

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
