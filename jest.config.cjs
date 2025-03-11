/** @type {import('jest').Config} */
const config = {
  preset: "react-native",
  setupFilesAfterEnv: ["./test/setup.ts"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["node_modules/(?!(.pnpm/)?(@?react-native.*|react-native-.*|)/)"],
  testPathIgnorePatterns: ["/.idea/", "/node_modules/", "/example/", "/dist/"],
};

// eslint-disable-next-line no-undef
module.exports = config;
