import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, GetCommand, PutCommand} from "@aws-sdk/lib-dynamodb";
import {dataConstants} from "../utils/common";

const ddbClient = new DynamoDBClient({region: dataConstants.region});
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const saveDataCache = async (newDataCache: any) => {
    // SDK 3
    const params = {
        TableName: dataConstants.cacheDynamo,
        Item: newDataCache,
    };
    try {
        return await docClient.send(new PutCommand(params));
    } catch (err) {
        throw new Error(err);
    }
};

export const getDataFusionadosCache = async (partitionKeyCache:string) => {
    // SDK 3
    try {
        const command = new GetCommand({
            TableName: dataConstants.cacheDynamo,
            Key: {
                id: partitionKeyCache,
            },
        });
        return docClient.send(command);

    } catch (err) {
        throw new Error(err);
    }
};
