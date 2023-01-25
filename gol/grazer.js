module.exports =  class Grazer {
    constructor(x, y) {
        // Farbe - yellow
        this.colorValue = 2;
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
        let fields = this.findFields(1);
        if (fields.length > 0) {
            let pos = fields[Math.floor(Math.random() * fields.length)];
            this.updateGameAndPos(pos[0], pos[1]);
            for(let i=0; i< grassArr.length; i++){
                let grObj = grassArr[i];
                if(grObj.x == this.x && grObj.y == this.y){
                    // lösche das grasObj
                    grassArr.splice(i, 1); // index, wieviele Element löschen
                    break;
                }
            }
            // removeFromList(this, grassArr); // Gras löschen

            this.eatCount++;
            this.notEaten = 0;
            this.mul();

        } else {
            this.notEaten++;
            this.eatCount = 0;
            if (this.notEaten >= 5) {
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
        for(let i=0; i< grazerArr.length; i++){
            let grObj = grazerArr[i];
            if(grObj.x == this.x && grObj.y == this.y){
                // lösche das grasObj
                grazerArr.splice(i, 1); // index, wieviele Element löschen
                break;
            }
        }
        // removeFromList(this, grazerArr);
    }

    mul() {
        if (this.eatCount >= 5) {
            // let pos = findRandomPosFor(this, 0);
            let emptyFields = this.findFields(0);
            if (emptyFields.length > 0) {
                let newPos = emptyFields[Math.floor(Math.random() * emptyFields.length)];
                let newX = newPos[0];
                let newY = newPos[1];
                grazerArr.push(new Grazer(newX, newY));
                matrix[newY][newX] = this.colorValue;
            }
            this.eatCount = 0;
        }
    }
}