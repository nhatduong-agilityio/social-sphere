import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!<rootDir>/src/**/*.stories.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'next-auth/providers/credentials':
      '<rootDir>/src/__mocks__/next-auth-providers-credentials.ts',
    'next-auth': '<rootDir>/src/__mocks__/next-auth.ts',
    '^@/api(.*)$': '<rootDir>src/api/$1',
    '^@/utils(.*)$': '<rootDir>src/utils/$1',
    '^@/components(.*)$': '<rootDir>src/components/$1',
    '^@/actions(.*)$': '<rootDir>src/actions/$1',
    '^@/features(.*)$': '<rootDir>src/features/$1',
    '^@/hooks(.*)$': '<rootDir>src/hooks/$1',
    '^@/services(.*)$': '<rootDir>src/services/$1',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/app',
    '<rootDir>/src/styles/fonts.ts',
    '<rootDir>/src/models',
    '<rootDir>/src/features/profile/components/skeletons/index.ts',
  ],
};

export default createJestConfig(config);
