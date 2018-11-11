import json
import boto3

client = boto3.client('lex-runtime')

def lambda_handler(event, context):
    print(event)
    response = client.post_text(
        botName = 'DiningConcierge',
        botAlias = 'DiningConcierge',
        userId = event['username'],
        sessionAttributes = {},
        requestAttributes = {},
        inputText = event['chatMsg']
    )

    return {'statusCode': 200, 'body': response['message']}