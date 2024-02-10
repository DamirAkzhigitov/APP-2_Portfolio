'use strict'
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
  const headers = {}

  const corsWhitelist = ['https://develop.damir-portfolio.com/', 'https://damir-portfolio.com/']
  if (corsWhitelist.indexOf(event.headers.origin) !== -1) {
    headers['Access-Control-Allow-Origin'] = event.headers.origin
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
  }

  return {
    statusCode: responseCode,
    headers: headers,
    body: JSON.stringify(responseBody)
  }
}

export { lambda_handler }
