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
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { JhiHealthService } from './health.service';

@Component({
    selector: 'jhi-health-modal',
    templateUrl: './health-modal.component.html'
})
export class JhiHealthModalComponent {
    currentHealth: any;

    constructor(private healthService: JhiHealthService, public activeModal: NgbActiveModal) {}

    baseName(name) {
        return this.healthService.getBaseName(name);
    }

    subSystemName(name) {
        return this.healthService.getSubSystemName(name);
    }

    readableValue(value: number) {
        if (this.currentHealth.name === 'diskSpace') {
            // Should display storage space in an human readable unit
            const val = value / 1073741824;
            if (val > 1) {
                // Value
                return val.toFixed(2) + ' GB';
            } else {
                return (value / 1048576).toFixed(2) + ' MB';
            }
        }

        if (typeof value === 'object') {
            return JSON.stringify(value);
        } else {
            return value.toString();
        }
    }
}
