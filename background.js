'use strict';


function changeSpeed(tab, speed_cmd) {
    // console.log("called changeSpeed " + speed_cmd);
    let url = tab.url;
    chrome.tabs.executeScript(tab.id, {
        code: 'var speed_cmd="' + speed_cmd + '"'
    }, function () {
        chrome.tabs.executeScript(tab.id, { file: 'inject.js' },
            function () {
                let options = {
                    type: "basic",
                    iconUrl: "./images/icon_128.png",
                    title: speed_cmd,
                    message: "\"" + "test" + "\"",
                }
                console.log("call notifications");
                chrome.notifications.create('change_speed', options);
            });
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
