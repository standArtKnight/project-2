const WebSocketServer = require('ws').Server;
const server = new WebSocketServer({ port: 9001 });

let connections = [];
let userCount = 0;

server.on('connection', socket => {
    console.log('new connection');
    connections.push(socket);
    ++userCount;
    socket.on('message', messageData => {
        const message = JSON.parse(messageData);
        let connectionsToSend = connections;
        
        if (message.type === 'authorization') {
            socket.userLogin = message.data.login;
            socket.userName = message.data.name;
            message.userCount = userCount;
            socket.userImage = message.data.image;
        }

        if (message.type === 'image') {
            socket.userImage = message.data.image;
        }

        message.from = socket.userLogin;
        message.userName = socket.userName;
        message.userImage = socket.userImage;
        
        messageData = JSON.stringify(message);

        connectionsToSend.forEach(connection => {
            connection.send(messageData, error => {
                if (error) {
                    connections = connections.filter(current => {
                        return current !== connection;
                    });
                }
            });
        });
    });

    socket.on('close', () => {
        connections = connections.filter(current => {
            return current !== socket;
        });

        let message = {
            type: 'close',
            userCount: --userCount,
            from: socket.userLogin
        }
        message = JSON.stringify(message);

        connections.forEach(connection => {
            connection.send(message, error => {
                if (error) {
                    connections = connections.filter(current => {
                        return current !== connection;
                    });
                }
            });
        });

        console.log('close connection');
    });
});