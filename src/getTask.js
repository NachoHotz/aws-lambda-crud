const AWS = require('aws-sdk');

const getTask = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'TaskTable',
    Key: {
      id,
    },
  };

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

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
