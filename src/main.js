const authContainer = document.querySelector('#auth-container');
const authForm = authContainer.querySelector('#authorization');
const chatContainer = document.querySelector('#chat-container');
const membersList = document.querySelector('#members');
const userInfo = document.querySelector('#user-info');
const memberCount = document.querySelector('#members-count');

const sendButton = document.querySelector('#sendButton');
const messageText = document.querySelector('#messageText');
const messageContainer = document.querySelector('#messages');

const fotoLoad = document.querySelector('#fotoLoad');
const theImage = document.querySelector('#theImage');
const fotoInput = document.querySelector('#fotoInput');
const cancelLoad = document.querySelector('#cancelLoad');
const fileReader = new FileReader();


let memberImg = document.createElement('img');
const palceholderImage = 'data:image/png;base64, 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';
memberImg.src = palceholderImage;
memberImg.id = 'memberImage';

const socket = new WebSocket('ws://localhost:9001');

socket.addEventListener('open', () => {
    authContainer.style.display = 'block';
    // authContainer.style.display = 'none';
    // chatContainer.style.display = 'flex';
});

socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    console.log(message);
    if (message.type === 'authorization') {
        let member = document.createElement('li');
        member.className = 'member';
        member.id = `member-${message.from}`;
        member.textContent = message.data.name;

        membersList.appendChild(member);

        memberCount.innerText = message.userCount;
    } else if (message.type === 'message') {
        var source = document.getElementById("message-template").innerHTML;
        var template = Handlebars.compile(source);
        var html = template(message);
        
        messageContainer.innerHTML += html;

    } else if (message.type === 'close') {
        let member = document.getElementById(`member-${message.from}`);
        member.remove();
        memberCount.innerText = message.userCount;
    }
});

socket.addEventListener('error', () => {
    alert('Соединение закрыто или не может быть открыто');
});

authForm.submit.addEventListener('click', (event) => {
    event.preventDefault();
    if (authForm.username.value && authForm.login.value) {
        authContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
        let message = {
            type: 'authorization',
            data: {
                name: authForm.username.value,
                login: authForm.login.value,
                image: palceholderImage
            }
        }
        sendToServer(message);

        let memberDiv = document.createElement('div');
        memberDiv.className = 'member';

        memberDiv.appendChild(memberImg);
        memberDiv.append(` ${message.data.name}`);

        userInfo.appendChild(memberDiv);
    }
});

sendButton.addEventListener('click', () => {
    let messageTime = new Date();
    let time =  messageTime.getHours() + ':' + (messageTime.getMinutes() < 10 ? '0' + messageTime.getMinutes() : messageTime.getMinutes());
    const message = {
        type: 'message',
        message: messageText.value,
        time: time
    }
    sendToServer(message);
    messageText.value = '';
});

fileReader.addEventListener('load', () => {
    theImage.src = fileReader.result;
    memberImg.src = fileReader.result;
    theImage.style.display = 'inline';

    let message = {
        type: 'image',
        data: {
            image: fileReader.result
        }
    }

    sendToServer(message);
});

fotoInput.addEventListener('change', event => {
    const file = event.target.files[0];
    if (file) {
        fileReader.readAsDataURL(file);
    }
});

cancelLoad.addEventListener('click', () => {
    fotoLoad.style.display = 'none';
});

memberImg.addEventListener("click", () => {
    fotoLoad.style.display = 'block';
});

function sendToServer(message) {
    socket.send(JSON.stringify(message));
}