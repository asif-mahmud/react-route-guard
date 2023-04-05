/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
    ["./src/route-guard.context.ts"]: {
      functions: 0,
    },
  },
  cache: false,
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { noUnusedLocals: false } }],
  },
};
