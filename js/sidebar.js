// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.

window.onload = () => {
    let sidemenuStatus = true;
    document.getElementById('toggle').addEventListener('click', () => {
        if (sidemenuStatus) {
            document.getElementsByTagName('main')[0].style.cssText = 'margin-left: -320px'
            sidemenuStatus = false;
        } else {
            document.getElementsByTagName('main')[0].style.cssText = 'margin-left: 0px'
            sidemenuStatus = true;
        }
    })
}