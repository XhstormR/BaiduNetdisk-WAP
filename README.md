# BaiduNetdisk (WAP)

<details>
<summary>Table of Contents</summary>

- [Install](#install)
- [Features](#features)
- [Extra](#extra)

</details>

## Install
Chrome : Click Settings -> Extensions -> Check Developer mode-> Load unpacked extension, navigate to the Chrome folder, click OK.

## Features

### 禁止跳转至 PC 版网页
https://pan.baidu.com/wap/home

### 突破大文件限制
https://pan.baidu.com/disk/home

## Extra

### 优酷视频使用 HTML5 播放器（解除优酷对 PC 端访问移动端的操作限制）
* http://m.youku.com/video/id_XMTg4MDUzNDM5Mg==.html
* http://m.youku.com/video/id_XMTQ1NzQ4MTg3Ng==.html

### 腾讯视频使用 HTML5 播放器
* https://v.qq.com/x/cover/vtxb95np45a6ooz/j0022b6o28p.html

### 伪装指定网站的 User-Agent (Android)

#### Header

1. 在 `C.js` 中指定网站。
  ```javascript
  urls: ['*://*.v2ex.com/*', '*://*.zhihu.com/*', '*://v.youku.com/*']
  ```

2. Done.

#### Native

1. 在 `manifest.json` 中指定网站。
  ```javascript
  "js": ["B.js"],
  "matches": ["*://*.baidu.com/*", "*://v.youku.com/*"],
  ```

2. Done.

### 加载自定义 CSS

在 `A.css` 中添加样式。

```css
a{text-decoration:none !important}
a:hover { text-decoration: underline !important;}
*:not([class*="icon"]):not(i){font-family: "Microsoft YaHei","Symbol" !important;}
```

### 阅读模式

开启 | 关闭：<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>

#### 指定网站自动开启阅读模式

在 `manifest.json` 中指定网站。

```javascript
"js": ["F.js"],
"matches": ["*://*.jianshu.com/*", "*://*.wikipedia.org/*", "*://*.stackoverflow.com/*"],
```

### 移除重复标签页
