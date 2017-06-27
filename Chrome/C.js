chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name == 'User-Agent') {
            details.requestHeaders[i].value = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Mobile Safari/537.36';
            break;
        }
    }
    return {
        requestHeaders: details.requestHeaders
    };
}, {
    urls: ['*://*.v2ex.com/*', '*://*.zhihu.com/*', '*://*.solidot.org/*', '*://*.vmovier.com/*', '*://v.youku.com/*', '*://m.youku.com/*', '*://*.jianshu.com/*', '*://*.wikipedia.org/*'] //    urls: ['<all_urls>']
}, ['blocking', 'requestHeaders']);

chrome.browserAction.onClicked.addListener(function(tab) {
    if (!confirm('是否要移除重复标签页？'))
        return;
    var urls = [], tabsToClose = [];
    chrome.tabs.query({
        currentWindow: true
    }, function(tabs) {
        tabs.reverse().forEach(function(tab) {
            if (~urls.indexOf(tab.url)) {
                tabsToClose.push(tab.id);
            } else {
                urls.push(tab.url);
            }
        });
        chrome.tabs.remove(tabsToClose);
    });
});
