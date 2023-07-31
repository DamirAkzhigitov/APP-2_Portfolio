'use strict'
console.log('Loading hello world function')

import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb'

const tableName = 'PortfolioWebDatabase'
const dynamodb = new DynamoDBClient({
  region: 'eu-north-1'
})

const lambda_handler = async (event) => {
  let responseCode = 200
  console.log('request: ' + JSON.stringify(event))

  let path = ''

  if (event && event.path) {
    path = event.path
  }

  let responseBody = {
    message: 'test message : event: ' + path,
    input: event
  }

  if (event.path === '/skills') {
    const params = {
      TableName: tableName,
      ExpressionAttributeValues: {
        ':a': { S: 'skills' }
      },
      KeyConditionExpression: 'cvid = :a'
    }

    const command = new QueryCommand(params)

    const response = await dynamodb.send(command)

    responseBody = response.Items
  }

  if (event.path === '/about_me') {
    const params = {
      TableName: tableName,
      ExpressionAttributeValues: {
        ':a': { S: 'about_me' }
      },
      KeyConditionExpression: 'cvid = :a'
    }

    const command = new QueryCommand(params)

    const response = await dynamodb.send(command)

    responseBody = response.Items
  }

  // if (event.body) {
  //   let body = JSON.parse(event.body)
  //   if (body.time)
  //     time = body.time;
  // }
  // console.log("response: " + JSON.stringify(response))
  return {
    statusCode: responseCode,
    headers: {
      'x-custom-header': 'my custom header value'
    },
    body: JSON.stringify(responseBody)
  }
}

export { lambda_handler }
