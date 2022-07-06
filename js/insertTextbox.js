// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.

const insertTextbox = () => {
    insertTextboxToolbox();

    document.getElementById("insert-textbox").onclick = function (e) {
        let textbox = new fabric.Textbox('Change me', {
            left: 50,
            top: 50,
            width: 150,
            fontSize: 20
        });
        canvas.add(textbox).setActiveObject(textbox);

        if (canvas.isDrawingMode) {
            document.getElementById("drawing-mode").click();
        }
    }

    // Apply selected font on change
    document.getElementById('textbox-fontname').onchange = function () {
        let activeObj = canvas.getActiveObject();
        if (activeObj) {
            activeObj.set("fontFamily", this.value);
            canvas.requestRenderAll();
        } else {
            document.getElementById('textbox-fontname').selectedIndex = 0;
        }
    };
};


const insertTextboxToolboxContents = `
<div class="col-2">
    Text
</div>
<div class="col-4">
    <button id="insert-textbox" class="btn btn-success">Insert</button>
</div>
<div class="col-6 d-flex align-items-center">
    <select class="form-select form-select-sm" aria-label="Font name"
        id="textbox-fontname" name="textbox-fontname" title="Font name">
        <option selected></option>
    </select>
</div>
`

const insertTextboxToolbox = () => {
    const insertTextboxToolboxElem = document.getElementById("insert-textbox-toolbox");
    insertTextboxToolboxElem.innerHTML = insertTextboxToolboxContents;
};