const express = require('express');
const app = express();

const Grass = require('./grass.js');
const Grazer = require('./grazer.js');
const Predator = require('./predator.js');

matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 3, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
];

grassArr = [];
grazerArr = [];
predArr = [];

function getRandomMatrix(width, height) {
    // erstellt matrix
    let matrix = [];
    // weitere Arrays erstellen
    for (let y = 0; y < height; y++) {
        // leeres Array in die Matrix speichern
        matrix.push([]);
        // jedes dieser Array - werte rein speichern
        for (let x = 0; x < width; x++) {
            matrix[y][x] = Math.floor(Math.random() * 2);
        }
    }
    return matrix;
}

function createMoreCreatures() {
    // Grasfresser und Fleischfresser
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (x == y) {
                matrix[y][x] = 2;
                if (y + 2 < matrix.length && x + 2 < matrix[0].length)
                    matrix[y + 2][x + 2] = 2;
            }
            if (x + y == matrix.length - 1) {
                matrix[y][x] = 3;
            }
        }
    }
}

function initGame() {
    matrix = getRandomMatrix(50, 50);
    createMoreCreatures();
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y));
            } else if (matrix[y][x] == 2) {
                grazerArr.push(new Grazer(x, y));
            }
            else if (matrix[y][x] == 3) {
                predArr.push(new Predator(x, y));
            }
        }
    }

}

function updateGame() {
    //update von Grass-Lebewesen
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }

    for (let i = 0; i < grazerArr.length; i++) {
        grazerArr[i].eat();
    }

    for (let i = 0; i < predArr.length; i++) {
        predArr[i].eat();
    }

    console.log(matrix);
}



app.listen(3000, () => {
    console.log("Server gestartet auf Port 3000");
    // game start
    initGame();
    setInterval(function () {
        updateGame();
    }, 1000);

});