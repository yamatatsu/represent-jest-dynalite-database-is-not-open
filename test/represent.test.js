const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
});

test("represent", async () => {
  await Promise.all(
    [...Array(10_000)].map((_, i) =>
      client.send(
        new PutItemCommand({
          TableName: "test-table",
          Item: { pk: { S: "a" } },
        })
      )
    )
  );
}, 1000);
