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
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-metrics-modal',
    templateUrl: './metrics-modal.component.html'
})
export class JhiMetricsMonitoringModalComponent implements OnInit {
    threadDumpFilter: any;
    threadDump: any;
    threadDumpAll = 0;
    threadDumpBlocked = 0;
    threadDumpRunnable = 0;
    threadDumpTimedWaiting = 0;
    threadDumpWaiting = 0;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.threadDump.forEach(value => {
            if (value.threadState === 'RUNNABLE') {
                this.threadDumpRunnable += 1;
            } else if (value.threadState === 'WAITING') {
                this.threadDumpWaiting += 1;
            } else if (value.threadState === 'TIMED_WAITING') {
                this.threadDumpTimedWaiting += 1;
            } else if (value.threadState === 'BLOCKED') {
                this.threadDumpBlocked += 1;
            }
        });

        this.threadDumpAll = this.threadDumpRunnable + this.threadDumpWaiting + this.threadDumpTimedWaiting + this.threadDumpBlocked;
    }

    getBadgeClass(threadState) {
        if (threadState === 'RUNNABLE') {
            return 'badge-success';
        } else if (threadState === 'WAITING') {
            return 'badge-info';
        } else if (threadState === 'TIMED_WAITING') {
            return 'badge-warning';
        } else if (threadState === 'BLOCKED') {
            return 'badge-danger';
        }
    }
}
