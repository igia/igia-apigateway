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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    errorMessage: string;
    error403: boolean;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(routeData => {
            if (routeData.error403) {
                this.error403 = routeData.error403;
            }
            if (routeData.errorMessage) {
                this.errorMessage = routeData.errorMessage;
            }
        });
    }
}
