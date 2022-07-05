// Copyright (c) 2022 YA-androidapp(https://github.com/YA-androidapp) All rights reserved.

const loadImage = () => {
    loadImageToolbox();

    document.getElementById("uploader").onchange = async function (e) {
        const uploadedFile = e.target.files[0];
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
            await pdfToImage(e.target.files[0]);
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
};


const loadImageToolboxContents = `
<div style="display: inline-block; margin-left: 10px">
    <input id="uploader" type="file"/>
</div>
`

const loadImageToolbox = () => {
    const loadImageToolboxElem = document.getElementById("load-image-toolbox");
    loadImageToolboxElem.innerHTML = loadImageToolboxContents;
};