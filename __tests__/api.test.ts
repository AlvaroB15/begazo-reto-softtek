import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import axios from 'axios';
import getMergedData from "@functions/get-fusionados";

jest.mock('@aws-sdk/client-dynamodb');
jest.mock('@aws-sdk/lib-dynamodb');
jest.mock('axios');

describe('API Integration Tests', () => {
    const mockDynamoDbSend = jest.fn();

    beforeAll(() => {
        process.env.WEATHER_API_KEY = 'test-api-key';
        (DynamoDBDocumentClient.from as jest.Mock).mockReturnValue({
            send: mockDynamoDbSend
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Complete API Flow', () => {
        it('should handle the complete flow with cache miss', async () => {
            // Mock cache miss
            mockDynamoDbSend.mockImplementationOnce(() => ({
                Item: null
            }));

            // Mock SWAPI response
            (axios.get as jest.Mock).mockImplementation((url) => {
                if (url.includes('swapi')) {
                    return Promise.resolve({
                        data: {
                            results: [
                                {
                                    name: 'Tatooine',
                                    climate: 'arid',
                                    terrain: 'desert'
                                }
                            ]
                        }
                    });
                } else if (url.includes('openweathermap')) {
                    return Promise.resolve({
                        data: {
                            main: {
                                temp: 30,
                                humidity: 50
                            },
                            weather: [{ description: 'clear sky' }]
                        }
                    });
                }
            });

            // Mock DynamoDB saves
            mockDynamoDbSend.mockImplementation(() => ({}));

            // Execute
            const response = await getMergedData({
                queryStringParameters: { lan: 'en', pag: '1' }
            } as any);

            // Assert
            expect(response.statusCode).toBe(200);
            const body = JSON.parse(response.body);
            expect(body.message).toBe('Planets list Found WITHOUT Cache');
            expect(body.data).toBeDefined();
            expect(body.data[0].planetInfo.name).toBe('Tatooine');
        });

        it('should handle the complete flow with cache hit', async () => {
            // Mock cache hit
            const cachedData = {
                Item: {
                    id: 'dataFusionados1',
                    fusedData: [
                        {
                            id: '1',
                            planetInfo: { name: 'Tatooine' },
                            weatherInfo: { temperature: 30 }
                        }
                    ],
                    expiresAt: Math.floor(Date.now() / 1000) + 1800 // 30 minutes from now
                }
            };

            mockDynamoDbSend.mockImplementationOnce(() => cachedData);

            // Execute
            const response = await getMergedData({
                queryStringParameters: { lan: 'en', pag: '1' }
            } as any);

            // Assert
            expect(response.statusCode).toBe(200);
            const body = JSON.parse(response.body);
            expect(body.message).toBe('Planets list Found WITH Cache');
            expect(body.data).toEqual(cachedData.Item);
        });
    });

    describe('Error Handling Flow', () => {
        it('should handle SWAPI API errors gracefully', async () => {
            // Mock cache miss
            mockDynamoDbSend.mockImplementationOnce(() => ({
                Item: null
            }));

            // Mock SWAPI error
            (axios.get as jest.Mock).mockRejectedValueOnce(new Error('SWAPI Error'));

            // Execute
            const response = await getMergedData({
                queryStringParameters: { lan: 'en', pag: '1' }
            } as any);

            // Assert
            expect(response.statusCode).toBe(500);
            const body = JSON.parse(response.body);
            expect(body.error).toBeDefined();
        });

        it('should handle DynamoDB errors gracefully', async () => {
            // Mock DynamoDB error
            mockDynamoDbSend.mockRejectedValueOnce(new Error('DynamoDB Error'));

            // Execute
            const response = await getMergedData({
                queryStringParameters: { lan: 'en', pag: '1' }
            } as any);

            // Assert
            expect(response.statusCode).toBe(500);
            const body = JSON.parse(response.body);
            expect(body.error).toBeDefined();
        });
    });
});
