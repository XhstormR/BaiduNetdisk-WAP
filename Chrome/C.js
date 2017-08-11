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
    urls: ['*://*.v2ex.com/*', '*://*.zhihu.com/*', '*://*.solidot.org/*', '*://*.vmovier.com/*', '*://v.youku.com/*', '*://m.youku.com/*', '*://*.jianshu.com/*', '*://*.wikipedia.org/*', '*://*.stackoverflow.com/*', '*://*.stackexchange.com/*', '*://*.serverfault.com/*', '*://*.superuser.com/*'] //    urls: ['<all_urls>']
}, ['blocking', 'requestHeaders']);

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

const TRANSLATION_URL = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=1&ssel=0&tsel=0&kc=3&q=";
const TRANSLATION_AUDIO_URL = "https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=en&client=gtx&q=";
const AUDIO = new Audio();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let text = request.text;
    let canRead = request.canRead;

    window.fetch(TRANSLATION_URL + text)
        .then(data => data.text())
        .then(data => JSON.parse(data))
        .then(data => sendResponse(data));

    if (canRead) {
        AUDIO.src = TRANSLATION_AUDIO_URL + text;
        AUDIO.play();
    }
    return true;
});
