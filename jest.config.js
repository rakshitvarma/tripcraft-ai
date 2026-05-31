export default {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['@testing-library/jest-dom'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: { '\\.(css|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.js' },
  testMatch: ['**/src/__tests__/**/*.test.{js,jsx}'],
  collectCoverageFrom: ['src/utils/**/*.js', 'src/hooks/**/*.js'],
}
