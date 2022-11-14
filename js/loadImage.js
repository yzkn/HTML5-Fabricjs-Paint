// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.

const loadImage = () => {
    loadImageToolbox();

    document.getElementById("main").ondragenter = (e) => {
        e.preventDefault();
        return false;
    };

    document.getElementById("main").ondragleave = (e) => {
        e.preventDefault();
        return false;
    };

    document.getElementById("main").ondragover = (e) => {
        e.preventDefault();
        return false;
    };

    document.getElementById("main").ondrop = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        Array.from(e.dataTransfer.files).forEach(async uploadedFile => {
            await loadImageFile(uploadedFile);
        });

        return false;
    }

    document.getElementById("uploader").onchange = async (e) => {
        Array.from(e.target.files).forEach(async uploadedFile => {
            await loadImageFile(uploadedFile);
        });
    }

    document.getElementById("clear-canvas").onclick = (e) => {
        canvas.clear();
    }

    document.getElementById("grid-canvas").onclick = (e) => {
        canvas.clear();

        const c = document.getElementById('main-canvas');
        const w = c.getAttribute("width");
        const h = c.getAttribute("height");

        const grid_s = 5;
        const grid_l = 50;

        for (var i = 0; i < (w / grid_s); i++) {
            let x = i * grid_s;
            if (x % grid_l == 0) {
                canvas.add(new fabric.Line([x, 0, x, h], { type: 'line', stroke: '#ccc', selectable: false }));
            } else {
                canvas.add(new fabric.Line([x, 0, x, h], { type: 'line', stroke: '#eee', selectable: false }));
            }
        }
        for (var j = 0; j < (h / grid_s); j++) {
            let y = j * grid_s;
            if (y % grid_l == 0) {
                canvas.add(new fabric.Line([0, y, w, y], { type: 'line', stroke: '#ccc', selectable: false }));
            } else {
                canvas.add(new fabric.Line([0, y, w, y], { type: 'line', stroke: '#eee', selectable: false }));
            }
        }
    }
};

const loadImageFile = async (uploadedFile) => {
    const uploadedFileType = uploadedFile.type;
    if (uploadedFileType == "image/svg+xml") {
        var url = URL.createObjectURL(uploadedFile);
        fabric.loadSVGFromURL(url, function (objects, options) {
            objects.forEach(function (svg) {
                svg.set({
                    top: 30,
                    left: 60
                });
                canvas.add(svg).renderAll();
            });
        });
    } else if (uploadedFileType == "application/pdf") {
        await pdfToImage(uploadedFile);
    } else {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var img = new fabric.Image(image);
                img.set({
                    left: 30,
                    top: 60
                });
                canvas.add(img).setActiveObject(img).renderAll();
            }
        }
        reader.readAsDataURL(uploadedFile);
    }
}


const loadImageToolboxContents = `
<button id="clear-canvas" class="btn btn-info">New</button>
<button id="grid-canvas" class="btn btn-info">Grid</button>

<label>
    <span class="btn btn-info">
        Open
        <input type="file" id="uploader" style="display:none" multiple>
    </span>
</label>
`

const loadImageToolbox = () => {
    const loadImageToolboxElem = document.getElementById("load-image-toolbox");
    loadImageToolboxElem.innerHTML = loadImageToolboxContents;
};