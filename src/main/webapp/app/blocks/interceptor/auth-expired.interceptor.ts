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
import { Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';

export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(private stateStorageService: StateStorageService, private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401 && err.url && !err.url.includes('/api/account')) {
                            const destination = this.stateStorageService.getDestinationState();
                            if (destination !== null) {
                                const to = destination.destination;
                                const toParams = destination.params;
                                if (to.name === 'accessdenied') {
                                    this.stateStorageService.storePreviousState(to.name, toParams);
                                }
                            } else {
                                this.stateStorageService.storeUrl('/');
                            }

                            const loginService: LoginService = this.injector.get(LoginService);
                            loginService.login();
                        }
                    }
                }
            )
        );
    }
}
