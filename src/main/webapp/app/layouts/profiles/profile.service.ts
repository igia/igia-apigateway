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
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';
import { ProfileInfo } from './profile-info.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private infoUrl = SERVER_API_URL + 'management/info';
    private profileInfo: Promise<ProfileInfo>;

    constructor(private http: HttpClient) {}

    getProfileInfo(): Promise<ProfileInfo> {
        if (!this.profileInfo) {
            this.profileInfo = this.http
                .get<ProfileInfo>(this.infoUrl, { observe: 'response' })
                .pipe(
                    map((res: HttpResponse<ProfileInfo>) => {
                        const data = res.body;
                        const pi = new ProfileInfo();
                        pi.activeProfiles = data['activeProfiles'];
                        pi.ribbonEnv = data['deploy-mode'] ? data['deploy-mode']['name'] : '';
                        if (pi.activeProfiles) {
                            pi.inProduction = pi.activeProfiles.includes('prod');
                            pi.swaggerEnabled = pi.activeProfiles.includes('swagger');
                        }
                        return pi;
                    })
                )
                .toPromise();
        }
        return this.profileInfo;
    }
}
