from datetime import date, timedelta
import os

from flask import Flask, jsonify
from flask_cors import CORS

import facebook
from pythainlp.sentiment import sentiment
from toolz import get_in

from search import search_thread, index_thread

FACEBOOK_GROUP_ID = '635133846845099'
FACEBOOK_USER_ACCESS_TOKEN = os.getenv('FACEBOOK_USER_ACCESS_TOKEN')
SINCE = '2018-07-04'

app = Flask(__name__)

CORS(app)



def get_sentiment(data):
    sentiment_results = {
        'pos': 0,
        'neg': 0,
    }
    title = data.get('title')
    if title:
        if sentiment(title) == 'pos':
            sentiment_results['pos'] += 1
        else:
            sentiment_results['neg'] += 1
    comments = data.get('comments')
    if comments:
        for comment in comments:
            if sentiment(comment.get('message')) == 'pos':
                sentiment_results['pos'] += 1
            else:
                sentiment_results['neg'] += 1

    total = sentiment_results['pos'] + sentiment_results['neg']
    if total:
        sentiment_results['pos'] /= total
        sentiment_results['neg'] /= total

    return sentiment_results


@app.route('/')
def index():
    # graph = facebook.GraphAPI(
        # access_token=FACEBOOK_USER_ACCESS_TOKEN,
        # version='2.7'
    # )
    # query_string = f'fields=feed.since({SINCE})' \
        # '{comments{comments{message,created_time,like_count},' \
        # 'message,created_time,like_count,reactions},' \
        # 'message,created_time,updated_time,reactions}'
    # endpoint_url = f'{FACEBOOK_GROUP_ID}?{query_string}'
    # feed = graph.request(endpoint_url).get('feed')

    import json
    with open('simplestat.json') as f:
        return jsonify(json.load(f))

    results = []
    for each in feed.get('data'):
        post = {}
        message = each.get('message')
        if message:
            post['title'] = message
            post['created_time'] = each.get('created_time')
            post['update_time'] = each.get('updated_time')
            post_id = each.get('id').split('_')[1]
            url = f'https://www.facebook.com/groups/{FACEBOOK_GROUP_ID}/permalink/{post_id}/'
            post['url'] = url
            post['comments'] = []
            comments = each.get('comments')
            if comments:
                for comment in comments.get('data'):
                    post['comments'].append(
                        {
                            'message': comment.get('message'),
                            'created_time': comment.get('created_time'),
                            'like_count': comment.get('like_count'),
                        }
                    )

                    comments_in_comment = comment.get('comments')
                    if comments_in_comment:
                        for comment_in_comment in comments_in_comment.get('data'):
                            post['comments'].append(
                                {
                                    'message': comment_in_comment.get('message'),
                                    'created_time': comment_in_comment.get('created_time'),
                                    'like_count': comment_in_comment.get('like_count'),
                                }
                            )

            post['sentiment'] = get_sentiment(post)

            results.append(post)

    return jsonify(results)


@app.route('/wordcloud/')
def wordcloud():
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

    text = ''
    for each in feed.get('data'):
        message = each.get('message')
        if message:
            text += message
            comments = each.get('comments')
            if comments:
                for comment in comments.get('data'):
                    text += comment.get('message')

                    comments_in_comment = comment.get('comments')
                    if comments_in_comment:
                        for comment_in_comment in comments_in_comment.get('data'):
                            text += comment_in_comment.get('message')


    from pythainlp.rank import rank
    from pythainlp.tokenize import word_tokenize

    word_list = word_tokenize(text, engine='newmm')
    word_count = rank(word_list)

    from toolz.dicttoolz import dissoc
    new_word_count = dissoc(word_count, ' ')
    words = []
    for each in new_word_count:
        d = {
            'word': each,
            'value': new_word_count[each]
        }
        words.append(d)

    return jsonify(words)


@app.route('/activities/')
def activities():
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

    post_activities = {}
    for i in range(8):
        days = 7 - i
        current_date = date.today() - timedelta(days=days)
        post_activities[current_date.strftime('%Y-%m-%d')] = 0

    for each in feed.get('data'):
        updated_date = each.get('updated_time').split('T')[0]
        post_activities[updated_date] += 1

    comment_activities = {}
    for i in range(8):
        days = 7 - i
        current_date = date.today() - timedelta(days=days)
        comment_activities[current_date.strftime('%Y-%m-%d')] = 0

    for each in feed.get('data'):
        message = each.get('message')
        if message:
            comments = each.get('comments')
            if comments:
                for comment in comments.get('data'):
                    updated_date = each.get('updated_time').split('T')[0]
                    comment_activities[updated_date] += 1

                    comments_in_comment = comment.get('comments')
                    if comments_in_comment:
                        updated_date = each.get('updated_time').split('T')[0]
                        comment_activities[updated_date] += 1

    results = {
        'posts': {
            'label': [],
            'data': [],
        },
        'comments': {
            'label': [],
            'data': [],
        },
    }
    for each in post_activities:
        results['posts']['label'].append(each)
        results['posts']['data'].append(post_activities[each])

    for each in comment_activities:
        results['comments']['label'].append(each)
        results['comments']['data'].append(comment_activities[each])

    return jsonify(results)


@app.route('/search/<string:keyword>', methods=['GET'])
def text_search(keyword):
    results = get_in(['hits', 'hits'], search_thread(keyword))

    return jsonify(results)


@app.route('/update-index/', methods=['GET'])
def update_index():
    index_thread()
    return jsonify({'detail': 'Update search index complete.'})


@app.route('/full/')
def full():
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

    return jsonify(feed)


if __name__ == '__main__':
    app.run(debug=True)
