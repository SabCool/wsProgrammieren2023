function main(){
    const socket = io();

    console.log('ready to chat...');

    let button = document.getElementById('send_btn');
    let input = document.getElementById('input_message');
    let chatDiv = document.getElementById('chat');


    function handleSubmit(){
        console.log('button geklicket');
        let message = input.value;
        if(message !== ''){
            socket.emit('send message', message);
            input.value = '';
        }
    }

    function handleMessage(msg){
        let p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
    }

    button.onclick = handleSubmit;
    socket.on('display message', handleMessage);

}

window.onload = main;