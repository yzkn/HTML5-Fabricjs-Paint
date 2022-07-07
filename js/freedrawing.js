// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.

let canvas;

const freeDrawing = () => {
    freeDrawingToolbox();

    var $ = function (id) { return document.getElementById(id) };

    canvas = new fabric.Canvas('main-canvas', {
        isDrawingMode: true
    });

    fabric.Object.prototype.transparentCorners = false;

    var drawingModeEl = $('drawing-mode'),
        drawingOptionsEl = $('drawing-mode-options'),
        drawingColorEl = $('drawing-color'),
        drawingShadowColorEl = $('drawing-shadow-color'),
        drawingLineWidthEl = $('drawing-line-width'),
        drawingShadowWidth = $('drawing-shadow-width'),
        drawingShadowOffset = $('drawing-shadow-offset'),
        clipboardButtonsEl = $('clipboard-buttons');

    drawingModeEl.onclick = function () {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        if (canvas.isDrawingMode) {
            drawingModeEl.innerHTML = 'Cancel dr mode';
            drawingOptionsEl.style.display = '';
            clipboardButtonsEl.style.display = 'none';
        }
        else {
            drawingModeEl.innerHTML = 'Enter dr mode';
            drawingOptionsEl.style.display = 'none';
            clipboardButtonsEl.style.display = '';
        }
    };

    if (fabric.PatternBrush) {
        var vLinePatternBrush = new fabric.PatternBrush(canvas);
        vLinePatternBrush.getPatternSrc = function () {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo(10, 5);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };

        var hLinePatternBrush = new fabric.PatternBrush(canvas);
        hLinePatternBrush.getPatternSrc = function () {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(5, 10);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };

        var squarePatternBrush = new fabric.PatternBrush(canvas);
        squarePatternBrush.getPatternSrc = function () {

            var squareWidth = 10, squareDistance = 2;

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
            var ctx = patternCanvas.getContext('2d');

            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, squareWidth, squareWidth);

            return patternCanvas;
        };

        var diamondPatternBrush = new fabric.PatternBrush(canvas);
        diamondPatternBrush.getPatternSrc = function () {

            var squareWidth = 10, squareDistance = 5;
            var patternCanvas = fabric.document.createElement('canvas');
            var rect = new fabric.Rect({
                width: squareWidth,
                height: squareWidth,
                angle: 45,
                fill: this.color
            });

            var canvasWidth = rect.getBoundingRect().width;

            patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
            rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

            var ctx = patternCanvas.getContext('2d');
            rect.render(ctx);

            return patternCanvas;
        };

        var img = new Image();
        img.src = 'img/fabricjs/honey_im_subtle.png';

        var texturePatternBrush = new fabric.PatternBrush(canvas);
        texturePatternBrush.source = img;
    }

    $('drawing-mode-selector').onchange = function () {

        if (this.value === 'hline') {
            canvas.freeDrawingBrush = vLinePatternBrush;
        }
        else if (this.value === 'vline') {
            canvas.freeDrawingBrush = hLinePatternBrush;
        }
        else if (this.value === 'square') {
            canvas.freeDrawingBrush = squarePatternBrush;
        }
        else if (this.value === 'diamond') {
            canvas.freeDrawingBrush = diamondPatternBrush;
        }
        else if (this.value === 'texture') {
            canvas.freeDrawingBrush = texturePatternBrush;
        }
        else {
            canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
        }

        if (canvas.freeDrawingBrush) {
            var brush = canvas.freeDrawingBrush;
            brush.color = drawingColorEl.value;
            if (brush.getPatternSrc) {
                brush.source = brush.getPatternSrc.call(brush);
            }
            brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
            brush.shadow = new fabric.Shadow({
                blur: parseInt(drawingShadowWidth.value, 10) || 0,
                offsetX: 0,
                offsetY: 0,
                affectStroke: true,
                color: drawingShadowColorEl.value,
            });
        }
    };

    drawingColorEl.onchange = function () {
        var brush = canvas.freeDrawingBrush;
        brush.color = this.value;
        if (brush.getPatternSrc) {
            brush.source = brush.getPatternSrc.call(brush);
        }
    };
    drawingShadowColorEl.onchange = function () {
        canvas.freeDrawingBrush.shadow.color = this.value;
    };
    drawingLineWidthEl.onchange = function () {
        canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
        $('drawing-line-width-info').innerHTML = ('000' + this.value).slice(-3);
    };
    drawingShadowWidth.onchange = function () {
        canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
        $('drawing-shadow-width-info').innerHTML = ('000' + this.value).slice(-3);
    };
    drawingShadowOffset.onchange = function () {
        canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
        canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
        $('drawing-shadow-offset-info').innerHTML = ('000' + this.value).slice(-3);
    };

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
            blur: parseInt(drawingShadowWidth.value, 10) || 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: true,
            color: drawingShadowColorEl.value,
        });
    }

    document.getElementById("clipboard-copy").onclick = (e) => {
        Copy();
    }

    document.getElementById("clipboard-paste").onclick = (e) => {
        Paste();
    }

    document.getElementById("select-all").onclick = (e) => {
        SelectAll();
    }

    document.getElementById("remove").onclick = (e) => {
        Remove();
    }
};

// Select all objects
function SelectAll() {
    canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();

    if (canvas.isDrawingMode) {
        document.getElementById("drawing-mode").click();
    }
}

// Remove selected objects
function Remove() {
    let activeObjects = canvas.getActiveObjects();
    if (activeObjects) {
        activeObjects.forEach(obj => {
            canvas.remove(obj);
        });

        canvas.discardActiveObject();
        canvas.requestRenderAll();
    }
}

// Clipboard
let _clipboard;

function Copy() {
    let activeObject = canvas.getActiveObject()
    if (activeObject) {
        activeObject.clone(function (cloned) {
            _clipboard = cloned;
        });
    }
}

function Paste() {
    if (_clipboard) {
        _clipboard.clone(function (clonedObj) {
            canvas.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
            });
            if (clonedObj.type === 'activeSelection') {
                clonedObj.canvas = canvas;
                clonedObj.forEachObject(function (obj) {
                    canvas.add(obj);
                });
                clonedObj.setCoords();
            } else {
                canvas.add(clonedObj);
            }
            _clipboard.top += 10;
            _clipboard.left += 10;
            canvas.setActiveObject(clonedObj);
            canvas.requestRenderAll();
        });
    }
}


const freeDrawingToolboxContents = `
<div id="drawing-buttons" class="my-3">
    <div class="container">
        <div class="row my-2">
            <div class="col-2">Mode</div>
            <div class="col">
                <button id="drawing-mode" class="btn btn-info">Cancel dr mode</button>
            </div>
        </div>
    </div>
</div>
<div id="clipboard-buttons" class="my-3" style="display: none;">
    <div class="container">
        <div class="row my-2">
            <div class="col-2">Parts</div>
            <div class="col">
                <button id="clipboard-copy" class="btn btn-light">Copy</button>
                <button id="clipboard-paste" class="btn btn-light">Paste</button>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-2"></div>
            <div class="col">
                <button id="select-all" class="btn btn-light">Select all</button>
                <button id="remove" class="btn btn-danger">Remove</button>
            </div>
        </div>
    </div>
</div>
<div id="drawing-mode-options" class="my-3">
    <div class="container">
        <div class="row my-2">
            <div class="col-3"><label for="drawing-mode-selector">Mode:</label></div>
            <div class="col">
                <select id="drawing-mode-selector"class="form-select form-select-sm">
                    <option>Pencil</option>
                    <option>Circle</option>
                    <option>Spray</option>
                    <option>Pattern</option>
                    <option>hline</option>
                    <option>vline</option>
                    <option>square</option>
                    <option>diamond</option>
                    <option>texture</option>
                </select>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-3">Line</div>
            <div class="col">
                <label for="drawing-line-width">width:</label>
            </div>
            <div class="col">
                <input type="range" value="2" min="0" max="100" id="drawing-line-width"">
            </div>
            <div class="col">
                <span id="drawing-line-width-info">2</span>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-3"></div>
            <div class="col">
                <label for="drawing-color">color:</label>
            </div>
            <div class="col">
                <input type="color" value="#56B0E4" id="drawing-color">
            </div>
            <div class="col"></div>
        </div>
        <div class="row my-2">
            <div class="col-3">Shadow</div>
            <div class="col">
                <label for="drawing-shadow-color">color:</label>
            </div>
            <div class="col">
                <input type="color" value="#56B0E4" id="drawing-shadow-color">
            </div>
            <div class="col"></div>
        </div>
        <div class="row my-2">
            <div class="col-3"></div>
            <div class="col"><label for="drawing-shadow-width">width:</label></div>
            <div class="col">
                <input type="range" value="0" min="0" max="100" id="drawing-shadow-width"">
            </div>
            <div class="col"><span id="drawing-shadow-width-info">0</span></div>
        </div>
        <div class="row my-2">
            <div class="col-3"></div>
            <div class="col"><label for="drawing-shadow-offset">offset:</label></div>
            <div class="col">
                <input type="range" value="0" min="0" max="100" id="drawing-shadow-offset"">
            </div>
            <div class="col"><span id="drawing-shadow-offset-info">0</span></div>
        </div>
    </div>
</div>
`

const freeDrawingToolbox = () => {
    const freeDrawingToolboxElem = document.getElementById("free-drawing-toolbox");
    freeDrawingToolboxElem.innerHTML = freeDrawingToolboxContents;
};