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
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { Log } from './log.model';

@Injectable({ providedIn: 'root' })
export class LogsService {
    constructor(private http: HttpClient) {}

    changeLevel(log: Log): Observable<HttpResponse<any>> {
        return this.http.put(SERVER_API_URL + 'management/logs', log, { observe: 'response' });
    }

    findAll(): Observable<HttpResponse<Log[]>> {
        return this.http.get<Log[]>(SERVER_API_URL + 'management/logs', { observe: 'response' });
    }
}
