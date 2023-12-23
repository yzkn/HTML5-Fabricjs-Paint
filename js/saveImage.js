// Copyright (c) 2022 YA-androidapp(https://github.com/yzkn) All rights reserved.

const saveImage = () => {
    saveImageToolbox();

    document.getElementById("save-image-png").onclick = async function (e) {
        const c = document.getElementById('main-canvas');
        c.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.download = 'daiku.png';
            a.href = url;
            a.click();
            a.remove();
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);
        }, 'image/png');
    }

    document.getElementById("save-image-svg").onclick = async function (e) {
        let svg = canvas.toSVG();
        const url = "data:image/svg+xml;base64," + window.btoa(svg);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = 'daiku.svg';
        a.href = url;
        a.click();
        a.remove();
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    }
};


const saveImageToolboxContents = `
<button id="save-image-png" class="btn btn-info">PNG</button>
<button id="save-image-svg" class="btn btn-info">SVG</button>
`

const saveImageToolbox = () => {
    const saveImageToolboxElem = document.getElementById("save-image-toolbox");
    saveImageToolboxElem.innerHTML = saveImageToolboxContents;
};