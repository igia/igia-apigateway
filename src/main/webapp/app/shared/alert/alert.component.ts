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
import { Component, OnDestroy, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-alert',
    template: `
        <div class="alerts" role="alert">
            <div *ngFor="let alert of alerts" [ngClass]="setClasses(alert)">
                <ngb-alert *ngIf="alert && alert.type && alert.msg" [type]="alert.type" (close)="alert.close(alerts)">
                    <pre [innerHTML]="alert.msg"></pre>
                </ngb-alert>
            </div>
        </div>`
})
export class JhiAlertComponent implements OnInit, OnDestroy {
    alerts: any[];

    constructor(private alertService: JhiAlertService) {}

    ngOnInit() {
        this.alerts = this.alertService.get();
    }

    setClasses(alert) {
        return {
            toast: !!alert.toast,
            [alert.position]: true
        };
    }

    ngOnDestroy() {
        this.alerts = [];
    }
}
