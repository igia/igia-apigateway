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
import { Injectable } from '@angular/core';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-session.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private principal: Principal, private authServerProvider: AuthServerProvider) {}

    login() {
        let port = location.port ? ':' + location.port : '';
        if (port === ':9000') {
            port = ':8088';
        }
        location.href = '//' + location.hostname + port + '/login';
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
    }
}
