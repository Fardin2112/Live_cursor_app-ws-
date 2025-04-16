import http from "http"
import { WebSocketServer } from "ws"
import url from "url"
import {v4 as uuidv4} from "uuid"

const server = http.createServer()
const wsServer = new WebSocketServer({ server})

const port = 8000

wsServer.on("connection", (connection, request) => {
    // ws : // http:localhost
    // wss : // https

    const {username} = url.parse(request.url, true).query
    const userId = uuidv4();
    console.log(username)
    console.log(userId);
    
})

server.listen(port, ()=>{
    console.log(`WebSocket is running on port ${port}`);
})