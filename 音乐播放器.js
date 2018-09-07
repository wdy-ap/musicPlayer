var log = console.log.bind(console)

var e = function(selector) {
    var element = document.querySelector(selector)
    if (element == null) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return element
    }
}

var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    if (elements.length == 0) {
        var s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
    } else {
        return elements
    }
}

var songNames = {
    0: '장가갈 수 있을까',
    1: '回到中学的暑假',
    2: '自己',
    3: 'Silver City',
}

var songSingers = {
    0: '&nbsp·&nbsp咖啡少年',
    1: '&nbsp·&nbspmy little airport',
    2: '&nbsp·&nbsp黄伊汶',
    3: '&nbsp·&nbspMyrne; Linying',
}

var songAlbums = {
    0: '&nbsp·&nbsp커피소년 첫번째 음악 로스팅',
    1: '&nbsp·&nbspLonely Friday',
    2: '&nbsp·&nbspThe Groove In Me',
    3: '&nbsp·&nbspSilver City / Release Me'
}

var controlFind = (index) => {
    var index = (index + 1) % 3
    var id = `#id-${index}`
    return e(id)
}

var clearPicActive = () => {
    var control1s = es('.control1')
    for (var i = 0; i < 3; i++) {
        control1s[i].classList.remove('active')
    }
}

var changeNumber = (index, num) => (index + num + 4) % 4

var singleMode = () => {
    var audio = e('audio')
    audio.load()
    audio.play()
}

var circleMode = () => {
    var audio = e('audio')
    var index = Number(audio.dataset.index)
    var indexNew = changeNumber(index, 1)
    audio.src = `./mp3s/${indexNew}.mp3`
    audio.play()
    audio.dataset.index = indexNew
}

var randomMode = () => {
    var audio = e('audio')
    var indexNew = Math.floor(Math.random() * 4)
    audio.src = `./mp3s/${indexNew}.mp3`
    audio.play()
    audio.dataset.index = indexNew
}

var songChoose = () => {
    var chosenSongs = es('.playlist-line')
    for (var i = 0; i < 4; i++) {
        chosenSongs[i].addEventListener('mouseover', function() {
            var self = event.target
            self.classList.add('hover')
        })
        chosenSongs[i].addEventListener('dblclick', function() {
            var self = event.target
            var id = self.parentElement.id
            var index = id.slice(-1)
            var audio = e('audio')
            audio.src = `./mp3s/${index}.mp3`
            audio.dataset.index = index
            audio.play()
        })
    }
}

var preLast = () => {
    var prenLast = es('.control2')
    for (var i = 0; i < 2; i++) {
        prenLast[i].addEventListener('click', function() {
            var changeButton = e('.change')
            var index = Number(changeButton.dataset.index)
            if (index === 0) {
                singleMode()
            } else if(index === 1) {
                circleMode()
            } else if (index === 2) {
                randomMode()
            }
        })
    }
}

var change = () => {
    var changeButton = e('.change')
    changeButton.addEventListener('click', function() {
        var self = event.target
        if (self.classList.contains('control1')) {
            clearPicActive()
            var index = Number(changeButton.dataset.index)
            controlFind(index).classList.add('active')
            var index = (index + 1 + 3) % 3
            changeButton.dataset.index = index
        }
    })
}

var changeMode = () => {
    var audio = e('audio')
    audio.addEventListener('ended', function() {
        var changeButton = e('.change')
        var n = Number(changeButton.dataset.index)
        if (n === 1) {
            circleMode()
        } else if (n === 2) {
            randomMode()
        } else if (n === 0) {
            singleMode()
        }
    })
}

var playlistChange = () => {
    var audio = e('audio')
    var n = Number(audio.dataset.index)
    var playList = e(`#id-song-${n}`)
    var playLists = es('.playlist-line')
    for (var i = 0; i < 4; i++) {
        playLists[i].classList.remove('white')
    }
    playList.classList.toggle('white')
}

var songChange = () => {
    var audio = e('audio')
    var songName = e('.song-name')
    var songSinger = e('.song-singer')
    var coverPic = e('.cover-pic')
    var songAlbum = e('.song-album')
    var changeButton = e('.change')
    var n = Number(audio.dataset.index)
    songName.innerHTML = songNames[n]
    songSinger.innerHTML = songSingers[n]
    songAlbum.innerHTML = songAlbums[n]
    coverPic.src = `./pics/cover/${n}.png`
}

var changeContent = () => {
    var audio = e('audio')
    audio.addEventListener('ended', function() {
        songChange()
        playlistChange()
    })
    var controlButtons = es('.control')
    for (var i = 0; i < 3; i++) {
        controlButtons[i].addEventListener('click', function() {
            songChange()
            playlistChange()
        })
    }
    var chosenSongs = es('.playlist-line')
    for (var i = 0; i < 4; i++) {
        chosenSongs[i].addEventListener('dblclick', function() {
            songChange()
            playlistChange()
        })
    }
}

var duringPlay = () => {
    var audio = e('audio')
    audio.addEventListener('play', function() {
        var coverPic = e('.cover-pic')
        coverPic.classList.add('during-play')
    })
    audio.addEventListener('pause', function() {
        var coverPic = e('.cover-pic')
        coverPic.classList.remove('during-play')
    })
}

var changeLike = () => {
    var playLikes = es('.playlist-like')
    for (var i = 0; i < 4; i++) {
        playLikes[i].addEventListener('click', function() {
            var self = event.target
            self.classList.toggle('unlike')
        })
    }
}

var __main = () => {
    songChoose()
    preLast()
    change()
    changeMode()
    changeContent()
    duringPlay()
    changeLike()
}

__main()
