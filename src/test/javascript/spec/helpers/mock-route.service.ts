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
import { ActivatedRoute, Router } from '@angular/router';
import { SpyObject } from './spyobject';
import { Observable, of } from 'rxjs';
import Spy = jasmine.Spy;

export class MockActivatedRoute extends ActivatedRoute {
    constructor(parameters?: any) {
        super();
        this.queryParams = of(parameters);
        this.params = of(parameters);
        this.data = of({
            ...parameters,
            pagingParams: {
                page: 10,
                ascending: false,
                predicate: 'id'
            }
        });
    }
}

export class MockRouter extends SpyObject {
    navigateSpy: Spy;

    constructor() {
        super(Router);
        this.navigateSpy = this.spy('navigate');
    }
}
