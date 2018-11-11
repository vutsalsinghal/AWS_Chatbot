import json
import boto3
import datetime as dt
from botocore.vendored import requests

client = boto3.client('sns')
sqs = boto3.resource('sqs')

queue = sqs.get_queue_by_name(QueueName='chatFIFO.fifo')
LIMIT = 3
RADIUS = 5000

def lambda_handler(event, context):
    for message in queue.receive_messages(MaxNumberOfMessages=10):
        body = json.loads(message.body)
        phone = body['customerPhone']
        if phone[0] != '+':
            phone = '+1' + phone
        
        date = '%s %s'%(body['diningDate'],body['diningTime'])
        print(date)
        
        headers ={'Authorization': 'Bearer <API-KEY>'}
        params = {'radius':RADIUS, 'limit':LIMIT}
        
        params["location"] = body['restaurantLocation']
        params["categories"] = body['cuisineType']
        params['open_at'] = int(dt.datetime.strptime(date,"%Y-%m-%d %H:%M").timestamp())
        
        
        API_ENDPOINT = "https://api.yelp.com/v3/businesses/search"
        response = requests.get(API_ENDPOINT, headers=headers, params=params)
        response = response.json()
        
        returnMessage = 'Your DiningConcierge results for ' + body['cuisineType'] + ' cuisine on ' + body['diningDate'] + ' at ' + body['diningTime'] + ' near ' + body['restaurantLocation'] + ':\n\n'
        for res in response['businesses']:
            returnMessage +=  ('Name: ' + res['name'] + '\nRating: ' + str(res['rating']) + '\nPrice:' + res['price'] + '\nPhone: ' + res['phone'] + '\nAddress:' + ' '.join(res['location']['display_address']) + '\n\n')
        
        client.publish(PhoneNumber=phone, Message=returnMessage)
        message.delete()