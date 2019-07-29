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

import { Log } from './log.model';
import { LogsService } from './logs.service';

@Component({
    selector: 'jhi-logs',
    templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {
    loggers: Log[];
    filter: string;
    orderProp: string;
    reverse: boolean;

    constructor(private logsService: LogsService) {
        this.filter = '';
        this.orderProp = 'name';
        this.reverse = false;
    }

    ngOnInit() {
        this.logsService.findAll().subscribe(response => (this.loggers = response.body));
    }

    changeLevel(name: string, level: string) {
        const log = new Log(name, level);
        this.logsService.changeLevel(log).subscribe(() => {
            this.logsService.findAll().subscribe(response => (this.loggers = response.body));
        });
    }
}
