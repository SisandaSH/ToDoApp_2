/** @type {import('jest').Config} */
const config = {
  // Existing Jest configuration options...

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  // Use babel-jest to transform JavaScript files with ESM
  transform: {
    "^.+\\.js$": "babel-jest"
  },

  // Treat .js files as ESM
  extensionsToTreatAsEsm: [".js"],

  // Transform node_modules if necessary
  transformIgnorePatterns: [
    "/node_modules/(?!YOUR_MODULES_TO_INCLUDE)"
  ]
};

export default config;
