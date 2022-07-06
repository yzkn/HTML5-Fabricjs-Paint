// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.

const history = () => {
    historyToolbox();

    document.getElementById("history-undo").onclick = function (e) {
        Undo()
    }

    document.getElementById("history-redo").onclick = function (e) {
        Redo();
    }
};

function Redo() {
    canvas.redo();
}

function Undo() {
    canvas.undo();
}


const historyToolboxContents = `
<button id="history-undo" class="btn btn-info">Undo</button>
<button id="history-redo" class="btn btn-info">Redo</button>
`

const historyToolbox = () => {
    const historyToolboxElem = document.getElementById("history-toolbox");
    historyToolboxElem.innerHTML = historyToolboxContents;
};