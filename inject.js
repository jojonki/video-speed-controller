(function () {
    var $video = document.querySelector('video');
    if ($video !== null) {
        var speed = $video.playbackRate;
        if (speed_cmd === "speed-up") {
            speed += 0.25;
        } else if (speed_cmd == 'speed-down') {
            speed -= 0.25;
        } else if (speed_cmd == 'speed-neutral') {
            speed = 1.0;
        } else {
            console.warn('Unknown speed command: ' + speed_cmd);
            speed = 1.0;
        }
        console.log('Set speed to ' + speed);
        document.querySelector('video').playbackRate = speed;
    }
})();