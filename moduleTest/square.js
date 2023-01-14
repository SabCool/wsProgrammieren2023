module.exports = class Square{
    constructor(side){
        this.side = side;
    }

    getArea(){
        return this.side * this.side;
    }
}

function myTest(){
    console.log("testing");
}

// module.exports = { Square, myTest}