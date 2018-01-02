"use strict";
let flag = false;
const readingStyle = document.createElement("link");
readingStyle.setAttribute("rel", "stylesheet");
readingStyle.setAttribute("href", chrome.runtime.getURL("css/read.css"));

function readingMode() {
    if (flag) {
        document.head.removeChild(readingStyle);
    } else {
        document.head.appendChild(readingStyle);
    }
    flag = !flag;
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

window.setInterval(`chrome.runtime.sendMessage({text: '', canRead: false});`, 300000); // 5分钟
