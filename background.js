'use strict';


function changeSpeed(tab, speed) {
    console.log("called changeSpeed");
    let url = tab.url;
    chrome.tabs.executeScript(tab.id, {
        code: 'var speed=' + speed
    }, function () {
        // chrome.tabs.executeScript(tab.id, { file: 'inject.js' });
        chrome.tabs.executeScript(tab.id, { code: "document.querySelector('video').playbackRate=2" });

        let options = {
            type: "basic",
            iconUrl: "./images/icon_128.png",
            title: "Change Speed",
            message: "\"" + speed + "\"",
        }
        console.log("call notifications");
        chrome.notifications.create('change_speed', options);
    });

}

chrome.commands.onCommand.addListener(function (command) {
    console.log("onCommand:", command);
    let copy_mode = null;
    if (command === "speed-up") {
        copy_mode = "plain"
    } else {
        alert("Unknown command: " + command);
    }

    console.log("command", copy_mode);
    if (copy_mode !== undefined) {
        console.log("call tabs.query to activeTab");
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function (tabs) {
            changeSpeed(tabs[0], 2.5);
        });
    }
});
