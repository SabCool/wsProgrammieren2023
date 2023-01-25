module.exports = class Predator {
    constructor(x, y) {
        // Farbe - red
        this.colorValue = 3;
        // Position
        this.x = x;
        this.y = y;
        // Sicht auf Nachbarfelder
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.eatCount = 0;
        this.notEaten = 0;
    }

    updateNeighbors() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    findFields(symbol) {
        this.updateNeighbors();
        let found = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            const pos = this.neighbors[i]; // [x, y]
            let posX = pos[0];
            let posY = pos[1];
            if (posX >= 0 && posX < matrix[0].length &&
                posY >= 0 && posY < matrix.length) {
                if (matrix[posY][posX] == symbol) {
                    found.push(pos);
                }
            }
        }
        return found;
    }

    updateGameAndPos(newX, newY) {
        matrix[newY][newX] = this.colorValue;
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
    }

    eat() {
        let fields = this.findFields(2);
        if (fields.length > 0) {
            let pos = fields[Math.floor(Math.random() * fields.length)];
            this.updateGameAndPos(pos[0], pos[1]);
            for(let i=0; i< grazerArr.length; i++){
                let grObj = grazerArr[i];
                if(grObj.x == this.x && grObj.y == this.y){
                    // lösche das grasObj
                    grazerArr.splice(i, 1); // index, wieviele Element löschen
                    break;
                }
            }
            // removeFromList(this, grazerArr); // Grasfresser löschen

            this.eatCount++;
            this.notEaten = 0;

            this.mul();

        } else {
            this.notEaten++;
            this.eatCount = 0;
            if (this.notEaten >= 8) {
                this.die();
            } else {
                this.move();
                this.mul();
            }
        }
    }

    move() {
        let emptyFields = this.findFields(0);
        if (emptyFields.length > 0) {
            let pos = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            this.updateGameAndPos(pos[0], pos[1]);
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for(let i=0; i< predArr.length; i++){
            let grObj = predArr[i];
            if(grObj.x == this.x && grObj.y == this.y){
                // lösche das grasObj
                predArr.splice(i, 1); // index, wieviele Element löschen
                break;
            }
        }
        // removeFromList(this, predArr);
    }

    mul() {
        if (this.eatCount >= 5) {
            let emptyFields = this.findFields(0);
            if (emptyFields.length > 0) {
                let pos = emptyFields[Math.floor(Math.random() * emptyFields.length)];

                predArr.push(new Predator(pos[0], pos[1]));
                matrix[pos[1]][pos[0]] = this.colorValue;
            }
            this.eatCount = 0;
        }
    }
}