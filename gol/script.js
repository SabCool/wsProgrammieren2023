let matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 3, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
];


let fr = 3;
let side = 10;

// 
let grassArr = [];
let grazerArr = [];
let predArr = [];

// Funktionen definieren
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
                if(y+2 < matrix.length && x+2 < matrix[0].length)
                matrix[y+2][x+2] = 2;
            }
            if(x+y == matrix.length-1){
                matrix[y][x] = 3;
            }
        }
    }
}

// einmal bei Programmstart
function setup() {
    matrix = getRandomMatrix(50, 50);
    createMoreCreatures();

    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac');
    frameRate(fr);

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

// wiederholend
function draw() {

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

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill('white');
            if (matrix[y][x] == 1) {
                fill("#28764F")
            } else if (matrix[y][x] == 2) {
                fill('#DB960B')
            } else if (matrix[y][x] == 3) {
                fill('#961707')
            }
            rect(x * side, y * side, side, side);
        }
    }



}

