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
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { ApigtwTestModule } from '../../../test.module';
import { JhiMetricsMonitoringComponent } from 'app/admin/metrics/metrics.component';
import { JhiMetricsService } from 'app/admin/metrics/metrics.service';

describe('Component Tests', () => {
    describe('JhiMetricsMonitoringComponent', () => {
        let comp: JhiMetricsMonitoringComponent;
        let fixture: ComponentFixture<JhiMetricsMonitoringComponent>;
        let service: JhiMetricsService;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [ApigtwTestModule],
                    declarations: [JhiMetricsMonitoringComponent]
                })
                    .overrideTemplate(JhiMetricsMonitoringComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(JhiMetricsMonitoringComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JhiMetricsService);
        });

        describe('refresh', () => {
            it('should call refresh on init', () => {
                // GIVEN
                const response = {
                    timers: {
                        service: 'test',
                        unrelatedKey: 'test'
                    },
                    gauges: {
                        'jcache.statistics': {
                            value: 2
                        },
                        unrelatedKey: 'test'
                    }
                };
                spyOn(service, 'getMetrics').and.returnValue(of(response));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.getMetrics).toHaveBeenCalled();
                expect(comp.servicesStats).toEqual({ service: 'test' });
                expect(comp.cachesStats).toEqual({ jcache: { name: 17, value: 2 } });
            });
        });

        describe('isNan', () => {
            it('should return if a variable is NaN', () => {
                expect(comp.filterNaN(1)).toBe(1);
                expect(comp.filterNaN('test')).toBe(0);
            });
        });
    });
});
