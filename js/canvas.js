const setCanvasSize = () => {
    const mainCanvasElem = document.getElementById("main-canvas");
    const parentElem = mainCanvasElem.parentElement;
    const h = parentElem.clientHeight;
    const w = parentElem.clientWidth;

    mainCanvasElem.setAttribute("width", w);
    mainCanvasElem.setAttribute("height", h);
    mainCanvasElem.style.width = w + "px";
    mainCanvasElem.style.height = h + "px";
}