let side = 10;
let matrixSize = 50;

let isRaining = false;

let socket = io();

function main(){
    
    // server hat matrix geschickt
    socket.on('send matrix', drawMatrix);
    // server hat regen nachricht geschickt
    socket.on('isRaining', rainHandler);

    let myKillBtn = document.getElementById('killButton');
    myKillBtn.addEventListener('click', killHandler);
}

function rainHandler(data){
    console.log("Regnet es: ",data);
    isRaining = data;
}

function killHandler(event){
    console.log("Kill Button geklickt....");
    // send webSocket Nachricht an Server
    socket.emit('kill', 10);
}

// einmal bei Programmstart
function setup() {
    createCanvas(matrixSize * side + 1, matrixSize * side + 1);
    background('#acacac');

}

// wiederholend
function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill('white');
            if (matrix[y][x] == 1) {
                fill("#28764F")
                if(isRaining) {
                    fill('blue');
                }
            } else if (matrix[y][x] == 2) {
                fill('#DB960B')
            } else if (matrix[y][x] == 3) {
                fill('#961707')
            }
            rect(x * side, y * side, side, side);
        }
    }
}

window.onload = main;

