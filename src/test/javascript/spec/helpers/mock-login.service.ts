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
import { LoginService } from 'app/core/login/login.service';
import Spy = jasmine.Spy;

export class MockLoginService extends SpyObject {
    loginSpy: Spy;
    logoutSpy: Spy;
    registerSpy: Spy;
    requestResetPasswordSpy: Spy;
    cancelSpy: Spy;

    constructor() {
        super(LoginService);

        this.setLoginSpy({});
        this.logoutSpy = this.spy('logout').andReturn(this);
        this.registerSpy = this.spy('register').andReturn(this);
        this.requestResetPasswordSpy = this.spy('requestResetPassword').andReturn(this);
        this.cancelSpy = this.spy('cancel').andReturn(this);
    }

    setLoginSpy(json: any) {
        this.loginSpy = this.spy('login').andReturn(Promise.resolve(json));
    }

    setResponse(json: any): void {
        this.setLoginSpy(json);
    }
}
