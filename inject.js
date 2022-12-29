(function () {
    var $video = document.querySelector('video');
    if ($video !== null) {

        var speed = $video.playbackRate;
        chrome.storage.local.get(["speed"]).then((result) => {
            // console.log("Value currently is " + result.speed);
            let speed = null
            if (result.speed === undefined) {
                speed = 1.0;
            }
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
            alert(speed)
            console.log('Set speed to ' + result.speed);
            $video.playbackRate = result.speed;
        });
        // chrome.storage.local.get(["key"]).then((result) => {
        //     console.log("Value currently is " + result.key);
        // });
    }
})();

document.querySelector('video').playbackRate;