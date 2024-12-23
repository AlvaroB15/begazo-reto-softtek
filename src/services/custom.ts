import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb";
import {dataConstants} from "../utils/common";

const ddbClient = new DynamoDBClient({region: "us-east-1"});
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const addDataCustomService = async (newData) => {
    // SDK 3
    console.log(newData);
    console.log(typeof newData);
    const params = {
        TableName: dataConstants.customDynamo,
        Item: newData,
    };
    try {
        return await docClient.send(new PutCommand(params));
    } catch (err) {
        throw new Error(err);
    }
};
