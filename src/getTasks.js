const AWS = require('aws-sdk');

const getTasks = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const scanResult = await dynamodb
      .scan({
        TableName: 'TaskTable',
      })
      .promise();

    const tasks = scanResult.Items;
    const totalTasks = scanResult.Count;

    return {
      status: 200,
      body: {
        total: totalTasks,
        items: tasks,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getTasks };
