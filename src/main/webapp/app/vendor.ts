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
/* after changing this file run 'npm run webpack:build' */
/* tslint:disable */
import '../content/scss/vendor.scss';
import 'bootstrap-material-design';
// Imports all fontawesome core and solid icons

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUser,
    faSort,
    faSortUp,
    faSortDown,
    faSync,
    faEye,
    faBan,
    faTimes,
    faArrowLeft,
    faSave,
    faPlus,
    faPencilAlt,
    faBars,
    faThList,
    faUserPlus,
    faRoad,
    faTachometerAlt,
    faHeart,
    faList,
    faBell,
    faBook,
    faHdd,
    faFlag,
    faWrench,
    faClock,
    faCloud,
    faSignOutAlt,
    faSignInAlt,
    faCalendarAlt,
    faSearch,
    faTrashAlt,
    faAsterisk,
    faTasks,
    faHome
} from '@fortawesome/free-solid-svg-icons';

// Adds the SVG icon to the library so you can use it in your page
library.add(faUser);
library.add(faSort);
library.add(faSortUp);
library.add(faSortDown);
library.add(faSync);
library.add(faEye);
library.add(faBan);
library.add(faTimes);
library.add(faArrowLeft);
library.add(faSave);
library.add(faPlus);
library.add(faPencilAlt);
library.add(faBars);
library.add(faHome);
library.add(faThList);
library.add(faUserPlus);
library.add(faRoad);
library.add(faTachometerAlt);
library.add(faHeart);
library.add(faList);
library.add(faBell);
library.add(faTasks);
library.add(faBook);
library.add(faHdd);
library.add(faFlag);
library.add(faWrench);
library.add(faClock);
library.add(faCloud);
library.add(faSignOutAlt);
library.add(faSignInAlt);
library.add(faCalendarAlt);
library.add(faSearch);
library.add(faTrashAlt);
library.add(faAsterisk);

// jhipster-needle-add-element-to-vendor - JHipster will add new menu items here
