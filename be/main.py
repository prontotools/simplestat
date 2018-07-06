import os

from flask import Flask, jsonify
from flask_cors import CORS

import facebook


FACEBOOK_GROUP_ID = '635133846845099'
FACEBOOK_USER_ACCESS_TOKEN = os.getenv('FACEBOOK_USER_ACCESS_TOKEN')
SINCE = '2018-07-04'
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

    query_string = f'fields=feed.since({SINCE})' \
        '{comments{comments{message,created_time,like_count},' \
        'message,created_time,like_count,reactions},' \
        'message,created_time,updated_time,reactions}'
    endpoint_url = f'{FACEBOOK_GROUP_ID}?{query_string}'
    feed = graph.request(endpoint_url).get('feed')

    results = []
    for each in feed.get('data'):
        post = {}
        message = each.get('message')
        if message:
            post['title'] = message
            post['comments'] = []
            comments = each.get('comments')
            if comments:
                for comment in comments.get('data'):
                    comment_message = comment.get('message')
                    post['comments'].append(comment_message)

                    comments_in_comment = comment.get('comments')
                    if comments_in_comment:
                        for comment_in_comment in comments_in_comment.get('data'):
                            post['comments'].append(comment_in_comment.get('message'))

        results.append(post)

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
