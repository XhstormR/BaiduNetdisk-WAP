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

const CSS = 'font-size: small;';

function translate(canRead) {
    let text = window.getSelection().toString().trim();
    if (!text) { // 空白字符串
        return;
    }
    if (canRead) {
        read(text);
    }
    chrome.runtime.sendMessage({text: text, canRead: canRead}, log);
}

function log(json) {
    console.group('%c%s', CSS, Date.now());
    if (json.translationResponse !== undefined) {
        console.log('%c%s', CSS, json.translationResponse);
    } else {
        if (json[1]) {
            json[1].forEach(value => console.log('%c%s', CSS, resolve(value[0]) + reduce(value[1])));
        }
        json[0]
            .filter(value => value[0] != null)
            .forEach(value => console.log('%c%s', CSS, value[1] + '\n' + value[0]));
    }
    console.groupEnd();
}

function read(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
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

const reduce = arr => arr.slice(0, 5).toString();

//window.setInterval(`chrome.runtime.sendMessage({text: '', canRead: false});`, 300000); // 5分钟
