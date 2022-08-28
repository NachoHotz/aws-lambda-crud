const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async (event) => {
  try {
    const { title, description } = JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    const newTask = {
      id,
      title,
      description,
      createdAt,
    };

    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    await dynamoDb
      .put({
        TableName: 'TaskTable',
        Item: newTask,
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify(newTask),
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addTask,
};
