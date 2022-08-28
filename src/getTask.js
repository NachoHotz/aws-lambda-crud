const AWS = require('aws-sdk');

const getTask = async (event) => {
  try {
    const { id } = event.pathParameters;

    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: 'TaskTable',
      Key: {
        id,
      },
    };

    const result = await dynamoDb.get(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getTask };
