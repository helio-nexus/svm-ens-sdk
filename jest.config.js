module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testTimeout: 1000000
}; 