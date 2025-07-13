"use strict";

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function executeScript(func) {
    let tab = await getCurrentTab()
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: func
    })
}

chrome.commands.onCommand.addListener(async function (command) {
    switch (command) {
        case "Reading Mode":
            executeScript(() => readingMode())
            break;
        case "Translate":
            executeScript(() => translate(false))
            break;
        case "Translate and Read":
            executeScript(() => translate(true))
            break;
    }
});

/*----------*/

const TRANSLATION_URL = "https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=1&ssel=0&tsel=0&kc=3&q=";
const TRANSLATION_AUDIO_URL = "https://translate.google.com/translate_tts?client=gtx&ie=UTF-8&tl=en&q=";
//const AUDIO = new Audio();

chrome.runtime.onMessage.addListener(function (data, sender, callback) {
    let text = encodeURIComponent(data.text);
    let canRead = data.canRead;
    let payload = {
        text: text,
        fromlang: "en",
        to: "zh-CHS"
    };
    payload = Object.entries(payload).map(([key, val]) => `${key}=${val}`).join('&');

    fetch(TRANSLATION_URL + text)
        .then(resp => resp.text())
        .then(resp => JSON.parse(resp))
        .then(json => {
            callback(json);

            let msg = "";
            if (json[1]) {
                json[1].forEach(value => msg += resolve(value[0]) + reduce(value[1]) + "\n");
            }
            json[0].forEach(value => msg += value[0] !== null ? value[0] : '');

            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'img/icon.png',
                title: json[0][0][1],
                message: msg
            }, null);
        });

    if (canRead) {
//        AUDIO.src = TRANSLATION_AUDIO_URL + text;
//        AUDIO.play();
    }

    return true;
});

const resolve = str => str + "：";

const reduce = arr => arr.slice(0, 5).toString();
