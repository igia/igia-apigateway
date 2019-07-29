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
export interface GuinessCompatibleSpy extends jasmine.Spy {
    /** By chaining the spy with and.returnValue, all calls to the function will return a specific
     * value. */
    andReturn(val: any): void;
    /** By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied
     * function. */
    andCallFake(fn: Function): GuinessCompatibleSpy;
    /** removes all recorded calls */
    reset();
}

export class SpyObject {
    static stub(object = null, config = null, overrides = null) {
        if (!(object instanceof SpyObject)) {
            overrides = config;
            config = object;
            object = new SpyObject();
        }

        const m = {};
        Object.keys(config).forEach(key => (m[key] = config[key]));
        Object.keys(overrides).forEach(key => (m[key] = overrides[key]));
        Object.keys(m).forEach(key => {
            object.spy(key).andReturn(m[key]);
        });
        return object;
    }

    constructor(type = null) {
        if (type) {
            Object.keys(type.prototype).forEach(prop => {
                let m = null;
                try {
                    m = type.prototype[prop];
                } catch (e) {
                    // As we are creating spys for abstract classes,
                    // these classes might have getters that throw when they are accessed.
                    // As we are only auto creating spys for methods, this
                    // should not matter.
                }
                if (typeof m === 'function') {
                    this.spy(prop);
                }
            });
        }
    }

    spy(name) {
        if (!this[name]) {
            this[name] = this._createGuinnessCompatibleSpy(name);
        }
        return this[name];
    }

    prop(name, value) {
        this[name] = value;
    }

    /** @internal */
    _createGuinnessCompatibleSpy(name): GuinessCompatibleSpy {
        const newSpy: GuinessCompatibleSpy = <any>jasmine.createSpy(name);
        newSpy.andCallFake = <any>newSpy.and.callFake;
        newSpy.andReturn = <any>newSpy.and.returnValue;
        newSpy.reset = <any>newSpy.calls.reset;
        // revisit return null here (previously needed for rtts_assert).
        newSpy.and.returnValue(null);
        return newSpy;
    }
}
