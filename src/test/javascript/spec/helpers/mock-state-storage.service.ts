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
import { StateStorageService } from 'app/core/auth/state-storage.service';
import Spy = jasmine.Spy;

export class MockStateStorageService extends SpyObject {
    getUrlSpy: Spy;
    storeUrlSpy: Spy;

    constructor() {
        super(StateStorageService);
        this.setUrlSpy({});
        this.storeUrlSpy = this.spy('storeUrl').andReturn(this);
    }

    setUrlSpy(json) {
        this.getUrlSpy = this.spy('getUrl').andReturn(json);
    }

    setResponse(json: any): void {
        this.setUrlSpy(json);
    }
}
