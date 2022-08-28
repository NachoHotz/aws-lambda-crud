const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async (event) => {
  const { title, description } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();

  const newTask = {
    id,
    title,
    description,
    createdAt,
  };

  const params = {
    TableName: 'TaskTable',
    Item: newTask,
  };

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    await dynamoDb.put(params).promise();

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
