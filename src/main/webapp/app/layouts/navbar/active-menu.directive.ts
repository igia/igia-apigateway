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
import { Directive, OnInit, ElementRef, Renderer, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Directive({
    selector: '[jhiActiveMenu]'
})
export class ActiveMenuDirective implements OnInit {
    @Input() jhiActiveMenu: string;

    constructor(private el: ElementRef, private renderer: Renderer, private translateService: TranslateService) {}

    ngOnInit() {
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.updateActiveFlag(event.lang);
        });
        this.updateActiveFlag(this.translateService.currentLang);
    }

    updateActiveFlag(selectedLanguage) {
        if (this.jhiActiveMenu === selectedLanguage) {
            this.renderer.setElementClass(this.el.nativeElement, 'active', true);
        } else {
            this.renderer.setElementClass(this.el.nativeElement, 'active', false);
        }
    }
}
