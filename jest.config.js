export default {
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "jsdom",
  testPathIgnorePatterns:[ "/node_modules/",
    "/__tests__/e2e/"]
};
