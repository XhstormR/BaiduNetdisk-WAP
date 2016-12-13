var actualCode = '(' + function() {
        'use strict';
        Object.defineProperties(Navigator.prototype, {
            userAgent: {
                value: 'AA',
                configurable: false,
                enumerable: true,
                writable: false
            },
            appVersion: {
                value: 'BB',
                configurable: false,
                enumerable: true,
                writable: false
            },
            platform: {
                value: 'Android',
                configurable: false,
                enumerable: true,
                writable: false
            },
        });
    } +
    ')();';
var s = document.createElement('script');
s.textContent = actualCode;
document.documentElement.appendChild(s);
s.remove();