// Copyright (c) 2022 YA-androidapp(https://github.com/yzkn) All rights reserved.

const shortcutKey = () => {
    document.addEventListener('keydown', (e) => {
        // Drawing mode
        if (e.key === 'Escape') {
            e.preventDefault();
            document.getElementById("drawing-mode").click();
            return false;
        }

        // Clipboard
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            document.getElementById("clipboard-copy").click();
            return false;
        }

        if (e.ctrlKey && e.key === 'v') {
            e.preventDefault();
            document.getElementById("clipboard-paste").click();
            return false;
        }

        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            document.getElementById("select-all").click();
            return false;
        }

        if (e.key === 'Delete') {
            e.preventDefault();
            document.getElementById("remove").click();
            return false;
        }

        // File
        if (e.ctrlKey && e.key === '0') {
            e.preventDefault();
            document.getElementById("clear-canvas").click();
            return false;
        }

        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            document.getElementById("grid-canvas").click();
            return false;
        }

        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            document.getElementById("save-image-png").click();
            return false;
        }

        // History
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            document.getElementById("history-undo").click();
            return false;
        }

        if (e.ctrlKey && e.key === 'y') {
            e.preventDefault();
            document.getElementById("history-redo").click();
            return false;
        }

        // Textbox
        if (e.ctrlKey && e.key === 'i') {
            e.preventDefault();
            document.getElementById("insert-textbox").click();
            return false;
        }
    })
}