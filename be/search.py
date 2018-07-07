import os

import facebook
from elasticsearch import Elasticsearch
from pythainlp.sentiment import sentiment


es = Elasticsearch()

FACEBOOK_GROUP_ID = '635133846845099'
FACEBOOK_USER_ACCESS_TOKEN = os.getenv('FACEBOOK_USER_ACCESS_TOKEN')
SINCE = '2018-07-04'


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


def index_thread():
    posts = get_all_post_in_group()
    id = 0

    for post in posts:
        comment_text = ''
        if post['comments']:
            for comment in post['comments']:
                comment_text += f" {comment['message']}"

        del post['comments']
        post['text'] = f"{post['title']} {comment_text}"

        id += 1
        es.index(index='posts', doc_type='post', id=id, body=post)


def get_thread(id=1):
    return es.get(index='posts', doc_type='post', id=id)


def search_thread(keyword=''):
    search_query = {
        'query': {
            'match_phrase': {
                'text': keyword
            },
        }
    }
    return es.search(index='posts', body=search_query)


def get_all_post_in_group():
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

    return results
