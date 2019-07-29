/*
 * This Source Code Form is subject to the terms of the Mozilla Public License, v.
 * 2.0 with a Healthcare Disclaimer.
 * A copy of the Mozilla Public License, v. 2.0 with the Healthcare Disclaimer can
 * be found under the top level directory, named LICENSE.
 * If a copy of the MPL was not distributed with this file, You can obtain one at
 * http://mozilla.org/MPL/2.0/.
 * If a copy of the Healthcare Disclaimer was not distributed with this file, You
 * can obtain one at the project website https://github.com/igia.
 *
 * Copyright (C) 2018-2019 Persistent Systems, Inc.
 */
module.exports = {
    preset: 'jest-preset-angular',
    setupTestFrameworkScriptFile: '<rootDir>/src/test/javascript/jest.ts',
    coverageDirectory: '<rootDir>/target/test-results/',
    globals: {
        'ts-jest': {
            tsConfigFile: 'tsconfig.json'
        },
        __TRANSFORM_HTML__: true
    },
    moduleNameMapper: {
        'app/(.*)': '<rootDir>/src/main/webapp/app/$1'
    },
    reporters: [
        'default',
        [ 'jest-junit', { output: './target/test-results/jest/TESTS-results.xml' } ]
    ],
    testResultsProcessor: 'jest-sonar-reporter',
    transformIgnorePatterns: ['node_modules/(?!@angular/common/locales)'],
    testMatch: ['<rootDir>/src/test/javascript/spec/**/+(*.)+(spec.ts)'],
    rootDir: '../../../',
    testURL: "http://localhost/"
};
