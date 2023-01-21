let clickCounter = 0;
function clickHandler(evt){
    // console.log(evt);
    clickCounter++;
    let str = "thanks for clicking: " + clickCounter;
    this.innerText = str;
}

let p = document.getElementById('pElement');
p.addEventListener('click', clickHandler);


function bodyClick(evt){
    console.log('clicked at: ', evt.pageX, evt.pageY);
}

function setup(){
    createCanvas(300,300);
    background('#acacac');
}

function mouseClicked() {
    console.log(mouseX, mouseY);
 }
 

window.onclick = bodyClick;

function pageLoaded(evt){
    console.log("Laden fertig... bitte Spiel starten...")

}

window.onload = pageLoaded;

function keyup(evt){
    console.log("keyboard pressed: ", evt.key);
}

window.onkeyup = keyup;

function keyPressed() {
    console.log(key);
 }
 
