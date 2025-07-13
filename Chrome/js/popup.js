if (confirm("是否要移除重复标签页？")) {
    const urls = [], tabsToClose = [];
    chrome.tabs.query(
        {
            currentWindow: true,
        },
        function (tabs) {
            tabs.reverse().forEach(function (tab) {
                let url = new URL(tab.url);
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
