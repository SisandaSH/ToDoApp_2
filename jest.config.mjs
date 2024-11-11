/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node", // Use Node environment instead of jsdom

  // Use babel-jest to transform JavaScript files with ESM
  transform: {
    "^.+\\.js$": "babel-jest"
  },

  // Transform node_modules if necessary
  transformIgnorePatterns: [
    "/node_modules/(?!YOUR_MODULES_TO_INCLUDE)"
  ]
};

export default config;
