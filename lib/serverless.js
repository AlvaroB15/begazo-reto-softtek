import getPeopleSwapi from "@functions/swapi-get-people";
import getPlanetSwapi from "@functions/get-fusionados";
import addPerson from "@functions/add-person";
import getPeople from "@functions/get-people";
import getPerson from "@functions/get-person";
const serverlessConfiguration = {
    service: "softtek",
    frameworkVersion: "3",
    plugins: ["serverless-esbuild"],
    provider: {
        name: "aws",
        runtime: "nodejs16.x",
        stage: "dev",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
        },
        iam: {
            role: {
                name: "role_aws_prueba_tecnica_softtek",
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
                        Resource: "arn:aws:dynamodb:us-east-1:*:table/PeopleTable"
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
            PeopleTable: {
                Type: "AWS::DynamoDB::Table",
                Properties: {
                    TableName: "PeopleTable",
                    BillingMode: "PAY_PER_REQUEST",
                    AttributeDefinitions: [
                        { AttributeName: "id", AttributeType: "S" }
                    ],
                    KeySchema: [
                        { AttributeName: "id", KeyType: "HASH" }
                    ]
                }
            }
        }
    },
    functions: { getPeopleSwapi, getPlanetSwapi, addPerson, getPeople, getPerson },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node16",
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 20,
        },
    },
};
module.exports = serverlessConfiguration;
//# sourceMappingURL=serverless.js.map
