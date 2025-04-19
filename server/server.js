import http from "http"
import { WebSocketServer } from "ws"
import url from "url"
import {v4 as uuidv4} from "uuid"

const server = http.createServer()
const wsServer = new WebSocketServer({ server})

const port = 8000

const users = { }
const connections = {}

const broadcast = () => {
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        const message = JSON.stringify(users)
        connection.send(message);
    })
}

const handleMessage = (bytes , userId) => {
    const message = JSON.parse(bytes.toString());
    const user = users[userId];
    user.state = message;

    broadcast();

    console.log(`$${user.username} update their state : ${JSON.stringify(user.state)}`);
}

const handleClose = userId => {
    
    console.log(`${users[userId].username} disconnected`)
    delete connections[userId];
    delete users[userId];
}

wsServer.on("connection", (connection, request) => {
    // ws : // http:localhost
    // wss : // https

    const {username} = url.parse(request.url, true).query
    const userId = uuidv4();
    console.log(username)
    console.log(userId);

    connections[userId] = connection
    
    users[userId] = {
        username,
        state : {}
    }

    connection.on("message", message => handleMessage(message,userId));
    connection.on("close",()=> handleClose(userId))

})

server.listen(port, ()=>{
    console.log(`WebSocket is running on port ${port}`);
})