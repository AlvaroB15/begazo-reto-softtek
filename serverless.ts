import type {AWS} from "@serverless/typescript";

import getMergedData from "src/functions/get-fusionados";
import addPerson from "@functions/add-person";
import getPerson from "@functions/get-person";
import getDataCustom from "src/functions/post-almacenar";
import getHistorial from "src/functions/get-historial";
import {dataConstants} from "./src/utils/common";

const serverlessConfiguration: AWS = {
    service: "softtek-reto-2025",
    frameworkVersion: "4",
    plugins: ["serverless-offline"],
    provider: {
        name: "aws",
        runtime: "nodejs20.x",
        stage: "dev",
        logRetentionInDays: 7,
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
            // authorizers:{
            //     cognitoAuthorizer:{
            //         type:"COGNITO_USER_POOLS",
            //         providerARNs:[
            //             "arn:aws:cognito-idp:<region>:<account-id>:userpool/<userpool-id>"
            //         ]
            //     }
            // },
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
        iam: {
            role: {
                name: "role_aws_prueba_tecnica_softtek_2025",
                statements: [
                    {
                        Effect: "Allow",
                        Action: [
                            "s3:PutObject",
                            "s3:DeleteObject",
                            "s3:GetObject",
                        ],
                        Resource: "*"
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "secretsmanager:GetSecretValue"
                        ],
                        Resource: "*"
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "dynamodb:DescribeTable",
                            "dynamodb:Query",
                            "dynamodb:GetItem",
                            "dynamodb:Scan",
                            "dynamodb:PutItem"
                        ],
                        Resource: [
                            `arn:aws:dynamodb:us-east-1:*:table/${dataConstants.nameDynamo}`,
                            `arn:aws:dynamodb:us-east-1:*:table/${dataConstants.planetsDynamo}`,
                            `arn:aws:dynamodb:us-east-1:*:table/${dataConstants.customDynamo}`,
                            `arn:aws:dynamodb:us-east-1:*:table/${dataConstants.cacheDynamo}`,
                        ]
                    },
                    {
                        Effect: "Allow",
                        Action: [
                            "execute-api:Invoke"
                        ],
                        Resource: "arn:aws:execute-api:*:*:*"
                    }
                ],
            }
        }
    },
    resources: {
        Resources: {
            [dataConstants.planetsDynamo]: {
                Type: "AWS::DynamoDB::Table",
                Properties: {
                    TableName: dataConstants.planetsDynamo,
                    BillingMode: "PAY_PER_REQUEST",
                    AttributeDefinitions: [
                        // {AttributeName: "id", AttributeType: "S"},
                        // {AttributeName: "createdAt", AttributeType: "S"},

                        {AttributeName: "type", AttributeType: "S"},
                        {AttributeName: "createdAt", AttributeType: "S"}
                    ],
                    KeySchema: [
                        // {AttributeName: "id", KeyType: "HASH"}

                        {AttributeName: "type", KeyType: "HASH"},
                        {AttributeName: "createdAt", KeyType: "RANGE"}
                    ],
                    GlobalSecondaryIndexes: [
                        {
                            IndexName: "CreatedAtIndex",
                            KeySchema: [
                                {
                                    AttributeName: "createdAt",
                                    KeyType: "HASH"
                                }
                            ],
                            Projection: {
                                ProjectionType: "ALL"
                            }
                        }
                    ]
                }
            },
            [dataConstants.customDynamo]: {
                Type: "AWS::DynamoDB::Table",
                Properties: {
                    TableName: dataConstants.customDynamo,
                    BillingMode: "PAY_PER_REQUEST",
                    AttributeDefinitions: [
                        {AttributeName: "id", AttributeType: "S"}
                    ],
                    KeySchema: [
                        {AttributeName: "id", KeyType: "HASH"}
                    ]
                }
            },
            [dataConstants.cacheDynamo]: {
                Type: "AWS::DynamoDB::Table",
                Properties: {
                    TableName: dataConstants.cacheDynamo,
                    BillingMode: "PAY_PER_REQUEST",
                    AttributeDefinitions: [
                        {AttributeName: "id", AttributeType: "S"}
                    ],
                    KeySchema: [
                        {AttributeName: "id", KeyType: "HASH"}
                    ],
                    TimeToLiveSpecification: {
                        AttributeName: 'expiresAt',
                        Enabled: true
                    },
                }
            }
        }
    },
    // import the function via paths
    functions: {getMergedData, addPerson, getPerson, getDataCustom, getHistorial},
    custom: {
        "serverless-offline": {
            httpPort: 3000
        },
        // Reemplazar la sección custom.esbuild por build
        build: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node20", // Actualizado a node20
            define: {"require.resolve": undefined},
            platform: "node",
            concurrency: 20,
        },
    },
};

module.exports = serverlessConfiguration;
