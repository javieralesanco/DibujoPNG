let canvas;
let context;
let grosor;
let color;
document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.canvas.width = document.getElementById('main').clientWidth * 0.8;
    context.canvas.height = document.getElementById('main').clientHeight * 0.8;
    canvas.addEventListener('mousedown', dibujando);
    canvas.addEventListener('mouseenter', setColor);
    document.getElementById('grosor').addEventListener('click', setGrosor);
    document.getElementById('grosor').addEventListener('keyup', setGrosor);
    document.getElementById('salto').addEventListener('click', setSalto);
    setColor();
    setGrosor();
    setSalto();
})
//Cambios
const setColor = () => {
    color = document.getElementById('color').value;
}
const setGrosor = () => {
    grosor = parseInt(document.getElementById('grosor').value);
}
const setSalto = () => {
    document.getElementById('grosor').step = parseInt(document.getElementById('salto').value);
}
//Dibujo
const dibujando = (evt) => {
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', quitarMove);
    let nposX = evt.offsetX;
    let nposY = evt.offsetY;
    pintar(nposX, nposY);
}
function pintar(nposX, nposY) {
    context.beginPath();
    context.moveTo(nposX, nposY);
    context.lineWidth = grosor;
    context.strokeStyle = color;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineTo(nposX, nposY);
    context.stroke();
}
const move = (evt) => {
    pintar(evt.offsetX, evt.offsetY);
}
const quitarMove = () => {
    canvas.removeEventListener('mousemove', move);
    //Pasar un canvas a png a jpg hay que convertirlo y cuesta mas
    //https://parzibyte.me/blog/2019/07/10/canvas-a-imagen-png-para-descargarla/
    //https://parzibyte.me/blog/2021/07/24/javascript-descargar-canvas-como-imagen/
    const fecha = new Date();
    const fehcaBien = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}_${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
    document.getElementById('descarga').href = canvas.toDataURL();
    document.getElementById('descarga').download = fehcaBien;
}