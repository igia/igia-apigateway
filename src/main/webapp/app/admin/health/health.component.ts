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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { JhiHealthService } from './health.service';
import { JhiHealthModalComponent } from './health-modal.component';

@Component({
    selector: 'jhi-health',
    templateUrl: './health.component.html'
})
export class JhiHealthCheckComponent implements OnInit {
    healthData: any;
    updatingHealth: boolean;

    constructor(private modalService: NgbModal, private healthService: JhiHealthService) {}

    ngOnInit() {
        this.refresh();
    }

    baseName(name: string) {
        return this.healthService.getBaseName(name);
    }

    getBadgeClass(statusState) {
        if (statusState === 'UP') {
            return 'badge-success';
        } else {
            return 'badge-danger';
        }
    }

    refresh() {
        this.updatingHealth = true;

        this.healthService.checkHealth().subscribe(
            health => {
                this.healthData = this.healthService.transformHealthData(health);
                this.updatingHealth = false;
            },
            error => {
                if (error.status === 503) {
                    this.healthData = this.healthService.transformHealthData(error.error);
                    this.updatingHealth = false;
                }
            }
        );
    }

    showHealth(health: any) {
        const modalRef = this.modalService.open(JhiHealthModalComponent);
        modalRef.componentInstance.currentHealth = health;
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );
    }

    subSystemName(name: string) {
        return this.healthService.getSubSystemName(name);
    }
}
