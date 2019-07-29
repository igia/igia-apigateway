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
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { JhiMetricsMonitoringModalComponent } from './metrics-modal.component';
import { JhiMetricsService } from './metrics.service';

@Component({
    selector: 'jhi-metrics',
    templateUrl: './metrics.component.html'
})
export class JhiMetricsMonitoringComponent implements OnInit, AfterViewInit {
    metrics: any = {};
    cachesStats: any = {};
    servicesStats: any = {};
    updatingMetrics = true;
    JCACHE_KEY: string;

    constructor(private modalService: NgbModal, private metricsService: JhiMetricsService) {
        this.JCACHE_KEY = 'jcache.statistics';
    }

    ngOnInit() {
        this.refresh();
    }

    ngAfterViewInit() {
        $('jhi-metrics').bootstrapMaterialDesign({});
    }

    refresh() {
        this.updatingMetrics = true;
        this.metricsService.getMetrics().subscribe(metrics => {
            this.metrics = metrics;
            this.updatingMetrics = false;
            this.servicesStats = {};
            this.cachesStats = {};
            Object.keys(metrics.timers).forEach(key => {
                const value = metrics.timers[key];
                if (key.includes('web.rest') || key.includes('service')) {
                    this.servicesStats[key] = value;
                }
            });
            Object.keys(metrics.gauges).forEach(key => {
                if (key.includes('jcache.statistics')) {
                    const value = metrics.gauges[key].value;
                    // remove gets or puts
                    const index = key.lastIndexOf('.');
                    const newKey = key.substr(0, index);

                    // Keep the name of the domain
                    this.cachesStats[newKey] = {
                        name: this.JCACHE_KEY.length,
                        value
                    };
                }
            });
        });
    }

    refreshThreadDumpData() {
        this.metricsService.threadDump().subscribe(data => {
            const modalRef = this.modalService.open(JhiMetricsMonitoringModalComponent, { size: 'lg' });
            modalRef.componentInstance.threadDump = data.threads;
            modalRef.result.then(
                result => {
                    // Left blank intentionally, nothing to do here
                },
                reason => {
                    // Left blank intentionally, nothing to do here
                }
            );
        });
    }

    filterNaN(input) {
        if (isNaN(input)) {
            return 0;
        }
        return input;
    }
}
