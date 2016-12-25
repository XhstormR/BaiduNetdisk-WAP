# BaiduNetdisk (WAP)

## Install
Chrome : Click Settings -> Extensions -> Check Developer mode-> Load unpacked extension, navigate to the Chrome folder, click OK.

## Features

### 禁止跳转至 PC 版网页
https://pan.baidu.com/wap/home

### 突破大文件限制
https://pan.baidu.com/disk/home

## Extra

### 伪装指定网站的 User-Agent (Android)
1. 去掉 `manifest.json` 中的注释。
  ```javascript
  //   "background": {"scripts": [ "C.js" ]},
  ```

2. 在 `C.js` 中指定网站。
  ```javascript
  urls: ['*://*.v2ex.com/*', '*://*.zhihu.com/*']
  ```

3. Done.