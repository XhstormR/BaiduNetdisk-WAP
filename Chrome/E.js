"use strict";
let flag = false;
const readingStyle = document.createElement("style");
readingStyle.textContent = `
*{color: #A9B7C6 !important;background-color: #2B2B2B !important;text-shadow: none !important;}
::selection{background: #b3d4fc !important;}
a,a code,a span,a strong,a font{color: #fff !important;}

pre a,blockquote a{background-color: #33373a !important;}
code,pre,pre span,blockquote,blockquote p{background-color: #33373a !important;border-radius: 3px;}
li>code,p>code,pre,blockquote{border: none !important;border-left: 2px solid #ffeb8e !important;}

::-webkit-scrollbar{width:8px;height:11px}
::-webkit-scrollbar-thumb{background:#969cbd}
::-webkit-scrollbar-thumb:hover{background:#ff9632}
`;

function readingMode() {
    if (flag) {
        flag = false;
        document.head.removeChild(readingStyle);
    } else {
        flag = true;
        document.head.appendChild(readingStyle);
    }
}

/*----------*/

const css = 'font-size: small;';

function translate(canRead) {
    let text = window.getSelection().toString().trim();
    window.console.group('%c%s', css, text);
    chrome.runtime.sendMessage({text: text, canRead: canRead}, callback);
}

function callback(o) {
    if (o[1]) {
        o[1].forEach(value => window.console.log('%c%s', css, resolve(value[0]) + reduce(value[1])));
    }
    o[0].forEach(value => window.console.log('%c%s', css, value[0] !== null ? value[0] : ''));
    window.console.groupEnd();
}

function resolve(str) {
    switch (str) {
        case "noun":
            return "名词：";
        case "pronoun":
            return "代词：";
        case "verb":
            return "动词：";
        case "adverb":
            return "副词：";
        case "preposition":
            return "介词：";
        case "conjunction":
            return "连词：";
        case "adjective":
            return "形容词：";
        case "auxiliary verb":
            return "助动词：";
        default:
            return str + "：";
    }
}

function reduce(arr) {
    return arr.slice(0, 5).toString();
}
