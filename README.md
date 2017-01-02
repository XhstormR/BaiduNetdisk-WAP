# BaiduNetdisk (WAP)

## Install
Chrome : Click Settings -> Extensions -> Check Developer mode-> Load unpacked extension, navigate to the Chrome folder, click OK.

## Features

### 禁止跳转至 PC 版网页
https://pan.baidu.com/wap/home

### 突破大文件限制
https://pan.baidu.com/disk/home

## Extra

### 解除优酷对 PC 端访问移动端的操作限制
http://m.youku.com/video/id_XMTg4MDUzNDM5Mg==.html
http://m.youku.com/video/id_XMTQ1NzQ4MTg3Ng==.html

### 伪装指定网站的 User-Agent (Android)
1. 去掉 `manifest.json` 中的注释。
  ```javascript
  //   "background": {"scripts": [ "C.js" ]},
  ```

2. 在 `C.js` 中指定网站。
  ```javascript
  urls: ['*://*.v2ex.com/*', '*://*.zhihu.com/*', '*://v.youku.com/*']
  ```

3. Done.