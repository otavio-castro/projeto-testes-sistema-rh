const jsdom = { testEnvironment: 'jsdom', setupFilesAfterEnv: ['<rootDir>/tests/unit/support/ambiente.js'] };

module.exports = {
  projects: [
    { displayName: 'unitarios', testMatch: ['<rootDir>/tests/unit/**/*.test.js'], ...jsdom },
    { displayName: 'refatoracao', testMatch: ['<rootDir>/tests/refatoracao/**/*.test.js'], ...jsdom },
    {
      displayName: 'selenium',
      testMatch: ['<rootDir>/tests/selenium/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/selenium/support/tempo.js'],
    },
  ],
};
