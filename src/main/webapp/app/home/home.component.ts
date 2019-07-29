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
import * as $ from 'jquery';
import { LoginService, Principal, Account } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.igia.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    account: Account;

    constructor(private principal: Principal, private loginService: LoginService) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.loginService.login();
    }

    ngAfterViewInit() {
        $('jhi-home').bootstrapMaterialDesign({});
    }
}
