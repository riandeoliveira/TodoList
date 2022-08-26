import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "." });

const customJestConfig = {
  clearMocks: true,
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};

export default createJestConfig(customJestConfig);
