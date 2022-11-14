// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.

window.addEventListener("DOMContentLoaded", (event) => {
    setCanvasSize();

    freeDrawing();
    history();
    insertTextbox();
    loadImage();
    saveImage();
    shortcutKey();

    initializeFontSelection(); // fonts.js
});