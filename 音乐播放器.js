var log = console.log.bind(console)
var e = selector => document.querySelector(selector)
var es = selector => document.querySelectorAll(selector)

var audio = e('audio')

var templateEachsong = (song) => {
    return `
    <div class='eachsong' id='id-song-${song[0]}'>
        <span class='eachsong-like'>❤</span>
        <span class='eachsong-name'>${song[1]}</span>
        <span class='eachsong-singer'>${song[2]}</span>
        <span class='eachsong-album'>${song[3]}</span>
    </div>
    `
}

var renderEachsong = function() {
    var playlist = e('.playlist')
    var arg = arguments[0]
    for (var i = 0; i < arg.length; i++) {
        var eachsong = templateEachsong(arg[i])
        playlist.insertAdjacentHTML('beforeend', eachsong)
    }
}

// 点击模式按钮切换图标
var modeButtonChange = () => {
    var modeButton = e('.modeButton')
    modeButton.addEventListener('click', () => {
        var index = Number(modeButton.dataset.index)
        var newIndex = (index + 1) % 3
        var newSrc = `./pics/图标/${newIndex}.png`
        modeButton.setAttribute('src', newSrc)
        modeButton.dataset.index = newIndex
    })
}

// 当前播放歌曲的信息
var infoSwitch = (index, songs) => {
    var infoPic = e('.info-pic')
    var src = `./pics/cover/${index}.png`
    infoPic.setAttribute('src', src)

    var songName = e('.song-name')
    var songSinger = e('.song-singer')
    var songAlbum = e('.song-album')
    songName.innerHTML = songs[index][1]
    songSinger.innerHTML = songs[index][2]
    songAlbum.innerHTML = songs[index][3]
}

// 歌曲被切换时，播放列表高亮的切换
var playlistSwitch = (index) => {
    var eachsongs = es('.eachsong')
    for (var i = 0; i < eachsongs.length; i++) {
        eachsongs[i].classList.remove('highlight')
    }
    eachsongs[index].classList.add('highlight')
}

// 歌曲被切换时，整个页面（包括歌曲src、当前播放歌曲信息、播放列表高亮）的切换、播放、专辑封面图旋转
var entireSwitch = function(index, songs) {
    var src =`./mp3s/${index}.mp3`
    audio.setAttribute('src', src)
    infoSwitch(index, songs)
    playlistSwitch(index)
    audio.play()
    var infoPic = e('.info-pic')
    infoPic.classList.add('playing')
}

// 传入序号，结合当前歌曲序号执行播放
var playCallback = (buttonIndex, songs) => {
    var audioIndex = Number(audio.dataset.index)
    var index = (audioIndex + buttonIndex + 4) % 4
    entireSwitch(index, songs)
    audio.dataset.index = index
}

// 检查模式按钮的情况（单曲or循环or随机）
var checkMode = () => {
    var modeButton = e('.modeButton')
    var index = Number(modeButton.dataset.index)
    return index
}

// 绑定上一首或下一首事件
var bindSwitches = (songs) => {
    var switches = es('.switchButton')
    for (var i = 0; i < switches.length; i++) {
        switches[i].addEventListener('click', () => {
            if (checkMode() === 0 || checkMode() === 1) {
                var self = event.target
                var buttonIndex = Number(self.dataset.index)
                playCallback(buttonIndex, songs)
            } else if (checkMode() === 2) {
                var buttonIndex = Math.floor(Math.random() * 4)
                playCallback(buttonIndex, songs)
            }
        })
    }
}

// 绑定ended事件
var bindEnded = (songs) => {
    audio.addEventListener('ended', () => {
        if (checkMode() === 0) {
            audio.play()
        } else if (checkMode() === 1) {
            playCallback(1, songs)
        } else if (checkMode() === 2) {
            var buttonIndex = Math.floor(Math.random() * 4)
            playCallback(buttonIndex, songs)
        }
    })
}

// 绑定播放列表双击事件
var bindClickPlaylist = (songs) => {
    var playList = e('.playlist')
    playList.addEventListener('dblclick', () => {
        var self = event.target
        var div = self.closest('div')
        var index = Number(div.id.slice(-1))
        entireSwitch(index, songs)
        audio.dataset.index = index
    })
}

// 绑定“鼠标移入变手势”事件
var bindMouseover = () => {
    var eachsongs = es('.eachsong')
    for (var i = 0; i < eachsongs.length; i++) {
        eachsongs[i].addEventListener('mouseover', () => {
            var self = event.target
            self.classList.add('pointer')
        })
    }
}

// 绑定点击爱心事件
var bindLike = () => {
    var likes = es('.eachsong-like')
    for (var i = 0; i < likes.length; i++) {
        likes[i].addEventListener('click', () => {
            var self = event.target
            self.classList.toggle('unlike')
        })
    }
}

var binds = (songs) => {
    bindSwitches(songs)
    bindEnded(songs)
    bindClickPlaylist(songs)
    bindMouseover()
    bindLike()
}

var _main = () => {
    var song0 = [0, '장가갈 수 있을까', '咖啡少年', '커피소년 첫번째 음악 로스팅']
    var song1 = [1, '回到中学的暑假', 'my little airport', 'Lonely Friday']
    var song2 = [2, '自己', '黄伊汶', 'The Groove In Me']
    var song3 = [3, 'Silver City', 'Myrne; Linying', 'Silver City / Release Me']
    var songs = [song0, song1, song2, song3]
    modeButtonChange()
    renderEachsong(songs.slice(1))
    binds(songs)
}

_main()
