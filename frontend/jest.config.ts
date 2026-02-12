import nextJest from "next/jest";

const createNextJestConfig = nextJest({
    dir: "./",
});

const config = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
};

export default createNextJestConfig(config);
