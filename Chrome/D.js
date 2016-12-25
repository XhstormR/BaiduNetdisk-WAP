window.addEventListener("load", function(event) {
    window.setTimeout(function() {
        document.getElementById('x-video-button').dispatchEvent(new UIEvent('touchend',{bubbles: true}));
    }, 300);
});