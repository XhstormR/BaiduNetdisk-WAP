"use strict";
chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    for (let i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders[i].value = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Mobile Safari/537.36';
            break;
        }
    }
    return {
        requestHeaders: details.requestHeaders
    };
}, {
    urls: ['*://*.v2ex.com/*', '*://*.hacpai.com/*', '*://*.oschina.net/*', '*://*.solidot.org/*', '*://*.vmovier.com/*', '*://*.jianshu.com/*', '*://*.wikipedia.org/*', '*://*.stackoverflow.com/*', '*://*.stackexchange.com/*', '*://*.serverfault.com/*', '*://*.superuser.com/*', '*://*.askubuntu.com/*', '*://*.quora.com/*'] //    urls: ['<all_urls>']
}, ['blocking', 'requestHeaders']);

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) { // 配合 m3u8 使用
    let header = {
        name: "Referer",
        value: "https://avgle.com/"
    };
    details.requestHeaders.push(header);
    return {
        requestHeaders: details.requestHeaders
    };
}, {
    urls: ['*://*.ahcdn.com/*', '*://*.qooqlevideo.com/*']
}, ['blocking', 'requestHeaders', 'extraHeaders']);

chrome.webRequest.onBeforeRequest.addListener(function (request) {
    let url = request.url.replace('ajax.googleapis.com', 'ajax.proxy.ustclug.org');
    return {
        redirectUrl: url
    };
}, {
    urls: ['*://ajax.googleapis.com/*']
}, ['blocking']);

chrome.webRequest.onBeforeRequest.addListener(function (request) {
    let url = chrome.runtime.getURL('player.html') + "#" + request.url;
    return {
        redirectUrl: url
    };
}, {
    urls: ['*://*/*.m3u8*'], types:['main_frame']
}, ['blocking']);

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
    if (details.url.startsWith("https://zh.m.wikipedia.org/wiki/")) {
        let newUrl = details.url.replace("/wiki/", "/zh-cn/");
        chrome.tabs.update(details.tabId, {
            url: newUrl
        });
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    if (!confirm('是否要移除重复标签页？'))
        return;
    const urls = [], tabsToClose = [];
    chrome.tabs.query({
        currentWindow: true
    }, function (tabs) {
        tabs.reverse().forEach(function (tab) {
            if (~urls.indexOf(tab.url)) {
                tabsToClose.push(tab.id);
            } else {
                urls.push(tab.url);
            }
        });
        chrome.tabs.remove(tabsToClose);
    });
});

chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case "Reading Mode":
            chrome.tabs.executeScript(null, {
                code: "readingMode();"
            });
            break;
        case "Translate and Read":
            chrome.tabs.executeScript(null, {
                code: "translate(true);"
            });
            break;
        case "Translate":
            chrome.tabs.executeScript(null, {
                code: "translate(false);"
            });
            break;
    }
});

/*----------*/

const TRANSLATION_URL = "https://translate.google.cn/translate_a/single?client=gtx&sl=auto&tl=zh-CN&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=1&ssel=0&tsel=0&kc=3&q=";
const TRANSLATION_AUDIO_URL = "https://translate.google.cn/translate_tts?client=gtx&ie=UTF-8&tl=en&q=";
const BING_TRANSLATION_URL = "https://cn.bing.com/ttranslate";
const AUDIO = new Audio();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let text = encodeURIComponent(request.text);
    let canRead = request.canRead;
    let payload = {
        text: text,
        from: "en",
        to: "zh-CHS"
    };
    payload = Object.entries(payload).map(([key, val]) => `${key}=${val}`).join('&');

    window.fetch(TRANSLATION_URL + text)
        .then(data => data.text())
        .then(data => JSON.parse(data))
        .then(data => {
            sendResponse(data);

            let msg = "";
            if (data[1]) {
                data[1].forEach(value => msg += resolve(value[0]) + reduce(value[1]) + "\n");
            }
            data[0].forEach(value => msg += value[0] !== null ? value[0] : '');

            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'img/icon.png',
                title: data[0][0][1],
                message: msg
            }, null);
        });

    window.fetch(BING_TRANSLATION_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: payload
    })
        .then(response => response.json())
        .then(data => {
            sendResponse(data);

            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'img/icon.png',
                title: request.text,
                message: data.translationResponse
            }, null);
        });

    if (canRead) {
        AUDIO.src = TRANSLATION_AUDIO_URL + text;
        AUDIO.play();
    }

    return true;
});

const resolve = str => str + "：";

const reduce = arr => arr.slice(0, 5).toString();
