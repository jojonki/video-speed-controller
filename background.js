'use strict';


function injectChangeSpeed(speed_cmd) {
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
        $video.playbackRate = speed;

        return speed
    }
}
function changeSpeed(tab, speed_cmd) {
    console.log("called changeSpeed " + speed_cmd);

    let tabId = tab.id;
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            func: injectChangeSpeed,
            args: [speed_cmd],
        },
        (res) => {
            let res_speed = res[0].result;
            console.log(res_speed)
            let options = {
                type: "basic",
                iconUrl: "./images/icon_128.png",
                title: speed_cmd,
                message: "Video speed: " + res_speed,
            }
            chrome.notifications.create(`change_speed-${Date.now()}`, options);
        });
}

chrome.commands.onCommand.addListener(function (command) {
    console.log("onCommand:", command);

    if (command !== undefined) {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function (tabs) {
            changeSpeed(tabs[0], command);
        });
    }
});
