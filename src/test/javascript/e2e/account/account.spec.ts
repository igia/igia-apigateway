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
import { browser, element, by, ExpectedConditions as EC } from 'protractor';

import { NavBarPage, SignInPage } from '../page-objects/jhi-page-objects';

const expect = chai.expect;

describe('account', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage(true);
    });
    // tslint:disable:no-unused-expression
    it('should fail to login with bad password', async () => {
        signInPage = await navBarPage.getSignInPage();
        browser.wait(EC.urlContains('auth/realms'), 10000, 'Login url not present').catch(() => {});
        await signInPage.loginWithOAuth('admin', 'foo');

        // Keycloak
        const alert = element(by.css('.alert-error'));
        if (await alert.isPresent()) {
            expect(await alert.getText()).to.eq('Invalid username or password.');
        } else {
            // Okta
            const error = element(by.css('.infobox-error'));
            expect(await error.getText()).to.eq('Sign in failed!');
        }
    });

    it('should login successfully with admin account', async () => {
        await signInPage.loginWithOAuth('', 'admin');

        browser.wait(EC.urlContains('/'), 5000, 'Page is not redirected to the home page after wait of 5 seconds.');
        expect(await navBarPage.signIn.isPresent()).to.be.false;
        expect(await navBarPage.signOut.isPresent()).to.be.true;
        await navBarPage.autoSignOut();
    });
});
