export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  // Polyfill crypto.randomUUID for jsdom (not available in older jsdom versions)
  setupFiles: ['<rootDir>/src/__tests__/__mocks__/jestSetup.js'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: {
    '\\.(css|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.js',
    // Replace the real weather util (which uses import.meta) with a test-safe version
    '^../utils/weather$': '<rootDir>/src/__tests__/__mocks__/weatherUtil.js',
    '^../../utils/weather$': '<rootDir>/src/__tests__/__mocks__/weatherUtil.js',
  },
  testMatch: ['**/src/__tests__/**/*.test.{js,jsx}'],
  collectCoverageFrom: ['src/utils/**/*.js', 'src/hooks/**/*.js'],
}
