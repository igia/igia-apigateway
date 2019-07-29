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
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApigtwTestModule } from '../../../test.module';
import { LogsComponent } from 'app/admin/logs/logs.component';
import { LogsService } from 'app/admin/logs/logs.service';
import { ITEMS_PER_PAGE } from 'app/shared';
import { Log } from 'app/admin';

describe('Component Tests', () => {
    describe('LogsComponent', () => {
        let comp: LogsComponent;
        let fixture: ComponentFixture<LogsComponent>;
        let service: LogsService;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [ApigtwTestModule],
                    declarations: [LogsComponent],
                    providers: [LogsService]
                })
                    .overrideTemplate(LogsComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(LogsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogsService);
        });

        describe('OnInit', () => {
            it('should set all default values correctly', () => {
                expect(comp.filter).toBe('');
                expect(comp.orderProp).toBe('name');
                expect(comp.reverse).toBe(false);
            });
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                const log = new Log('main', 'WARN');
                spyOn(service, 'findAll').and.returnValue(
                    of(
                        new HttpResponse({
                            body: [log],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.loggers[0]).toEqual(jasmine.objectContaining(log));
            });
        });
        describe('change log level', () => {
            it('should change log level correctly', () => {
                // GIVEN
                const log = new Log('main', 'ERROR');
                spyOn(service, 'changeLevel').and.returnValue(of(new HttpResponse()));
                spyOn(service, 'findAll').and.returnValue(of(new HttpResponse({ body: [log] })));

                // WHEN
                comp.changeLevel('main', 'ERROR');

                // THEN
                expect(service.changeLevel).toHaveBeenCalled();
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.loggers[0]).toEqual(jasmine.objectContaining(log));
            });
        });
    });
});
