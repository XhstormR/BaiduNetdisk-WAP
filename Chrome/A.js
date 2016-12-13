var actualCode = '(' + function() {
        'use strict';
        Object.defineProperty(navigator, 'platform', {
            get: function() {
                return 'Android';
            }
        });
    } +
    ')();';
var s = document.createElement('script');
s.textContent = actualCode;
document.documentElement.appendChild(s);
s.remove();