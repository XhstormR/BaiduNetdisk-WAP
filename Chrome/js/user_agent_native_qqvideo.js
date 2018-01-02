var actualCode = '(' + function() {
        'use strict';
        Object.defineProperty(navigator, 'userAgent', {
            get: function() {
                return 'Macintosh Mac OS X 123';
            }
        });
    }
    + ')();';
var s = document.createElement('script');
s.textContent = actualCode;
document.documentElement.appendChild(s);
s.remove();