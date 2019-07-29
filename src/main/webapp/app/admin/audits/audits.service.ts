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
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from 'app/shared';
import { SERVER_API_URL } from 'app/app.constants';
import { Audit } from './audit.model';

@Injectable({ providedIn: 'root' })
export class AuditsService {
    constructor(private http: HttpClient) {}

    query(req: any): Observable<HttpResponse<Audit[]>> {
        const params: HttpParams = createRequestOption(req);
        params.set('fromDate', req.fromDate);
        params.set('toDate', req.toDate);

        const requestURL = SERVER_API_URL + 'management/audits';

        return this.http.get<Audit[]>(requestURL, {
            params,
            observe: 'response'
        });
    }
}
