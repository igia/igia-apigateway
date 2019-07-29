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
import { SpyObject } from './spyobject';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core/language/language.helper';
import Spy = jasmine.Spy;

export class MockLanguageService extends SpyObject {
    getCurrentSpy: Spy;
    fakeResponse: any;

    constructor() {
        super(JhiLanguageService);

        this.fakeResponse = 'en';
        this.getCurrentSpy = this.spy('getCurrent').andReturn(Promise.resolve(this.fakeResponse));
    }

    init() {}

    changeLanguage(languageKey: string) {}

    setLocations(locations: string[]) {}

    addLocation(location: string) {}

    reload() {}
}

export class MockLanguageHelper extends SpyObject {
    getAllSpy: Spy;

    constructor() {
        super(JhiLanguageHelper);

        this.getAllSpy = this.spy('getAll').andReturn(Promise.resolve(['en', 'fr']));
    }
}
