var readingStyle = document.createElement("style");
readingStyle.textContent = "*{color: #A9B7C6 !important;background-color: #2B2B2B !important;}";

function readingMode(flag) {
    if (flag) {
        document.body.appendChild(readingStyle);
    } else {
        document.body.removeChild(readingStyle);
    }
}
