let flag = false;
let readingStyle = document.createElement("style");
readingStyle.textContent = "*{color: #A9B7C6 !important;background-color: #2B2B2B !important;text-shadow: none !important;}     a:link,a:visited,a:active{color: #fff !important;}";

function readingMode() {
    if (flag) {
        flag = false;
        document.head.removeChild(readingStyle);
    } else {
        flag = true;
        document.head.appendChild(readingStyle);
    }
}
