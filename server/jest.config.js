module.exports = {
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    moduleNameMapper: {
        "@express-decorators": "<rootDir>/src/utils/express",
        "@express-decorators/(.*)": "<rootDir>/src/utils/express/$1",
        "@sequelize-decorators": "<rootDir>/src/utils/sequelize",
        "@sequelize-decorators/(.*)": "<rootDir>/src/utils/sequelize/$1"
    },
    moduleFileExtensions: ['ts', 'js', 'node'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleDirectories: ["node_modules", "src", "@sequelize-decorators", "@express-decorators"]
}