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
import { TestBed } from '@angular/core/testing';

import { LogsService } from 'app/admin/logs/logs.service';
import { Log } from 'app/admin/logs/log.model';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service Tests', () => {
    describe('Logs Service', () => {
        let service: LogsService;
        let httpMock;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });

            service = TestBed.get(LogsService);
            httpMock = TestBed.get(HttpTestingController);
        });

        afterEach(() => {
            httpMock.verify();
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.findAll().subscribe(() => {});

                const req = httpMock.expectOne({ method: 'GET' });
                const resourceUrl = SERVER_API_URL + 'management/logs';
                expect(req.request.url).toEqual(resourceUrl);
            });

            it('should return Logs', () => {
                const log = new Log('main', 'ERROR');

                service.findAll().subscribe(received => {
                    expect(received.body[0]).toEqual(log);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([log]);
            });

            it('should change log level', () => {
                const log = new Log('main', 'ERROR');

                service.changeLevel(log).subscribe(received => {
                    expect(received.body[0]).toEqual(log);
                });

                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush([log]);
            });
        });
    });
});
