if (confirm("是否要移除重复标签页？")) {
    const urls = [], tabsToClose = [];
    chrome.tabs.query(
        {
            currentWindow: true,
        },
        function (tabs) {
            tabs.reverse().forEach(function (tab) {
                let url;
                try {
                    url = new URL(tab.url);
                } catch {
                    return; // 无效 URL，跳过该 tab
                }
                url.hash = "";
                url = url.toString();
                if (~urls.indexOf(url)) {
                    tabsToClose.push(tab.id);
                } else {
                    urls.push(url);
                }
            });
            chrome.tabs.remove(tabsToClose);
        }
    );
}
