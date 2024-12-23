import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand, QueryCommand} from "@aws-sdk/lib-dynamodb";
import {dataConstants} from "../utils/common";

const ddbClient = new DynamoDBClient({region: dataConstants.region});
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const savePlanet = async (newPlanet: any) => {
    // SDK 3
    const params = {
        TableName: dataConstants.planetsDynamo,
        Item: newPlanet,
    };
    try {
        return await docClient.send(new PutCommand(params));
    } catch (err) {
        throw new Error(err);
    }
    /*
    VERSION SDK 2
        return await dynamoDb
            .put({
                TableName: nameTable,
                Item: newPerson,
            })
            .promise();
     */
};

export const getHistorialService = async (page: string, order: string, limit: number, _nextTokenParam: any) => {
    // SDK 3
    try {
        const params = {
            TableName: dataConstants.planetsDynamo,
            // IndexName: "CreatedAtIndex",
            Limit: limit,
            ScanIndexForward: order === "asc", // true para ascendente, false para descendente
            ExclusiveStartKey: Number(page) > 1 && _nextTokenParam ? JSON.parse(Buffer.from( _nextTokenParam || "", 'base64').toString()) : undefined,
            KeyConditionExpression: "#type = :type",
            ExpressionAttributeNames: {
                "#type": "type"
            },
            ExpressionAttributeValues: {
                ":type": "planet"
            },
        };
        const response = await docClient.send(new QueryCommand(params));
        return {
            nextToken: response.LastEvaluatedKey ? Buffer.from(JSON.stringify(response.LastEvaluatedKey)).toString('base64') : null,
            page,
            items: response.Items,
        }
    } catch (err) {
        console.log('err', err);
        throw new Error(err);
    }
    /*
    VERSION SDK 2
        return await dynamoDb
            .get({
                TableName: "PeopleTable",
                Key: { id },
            })
            .promise();
     */
};
