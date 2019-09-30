let player = videojs('vid1')

const play = url => player.src({src: url, type: 'application/x-mpegURL'})

const load = () => play(window.location.hash.split("#")[1])

window.onhashchange = () => load()

load()
