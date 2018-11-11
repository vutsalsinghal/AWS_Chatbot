import json
import boto3

sqs = boto3.resource('sqs')
queue = sqs.get_queue_by_name(QueueName='chatFIFO.fifo')

def lambda_handler(event, context):
    msg = 'Received your order. Will send recommendations soon on your mobile!'
    d = {
        'sessionAttributes': event['sessionAttributes'],
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': 'Fulfilled',
            "message": {
              "contentType": "PlainText",
              "content": msg
            }
        }
    }

    response = queue.send_message(MessageBody=json.dumps(event['currentIntent']["slots"]), MessageGroupId='messageGroup1')
    return d