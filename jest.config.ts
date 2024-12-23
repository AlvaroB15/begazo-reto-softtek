import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/**/__tests__/**'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    setupFiles: ['<rootDir>/src/__tests__/setup.ts']
};

export default config;

// src/__tests__/setup.ts
process.env.USER_POOL_ID = 'test-user-pool-id';
process.env.USER_POOL_CLIENT_ID = 'test-client-id';
process.env.WEATHER_API_KEY = 'test-weather-api-key';