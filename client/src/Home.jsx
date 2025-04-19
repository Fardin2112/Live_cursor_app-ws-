import React, { useEffect , useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import throttle from 'lodash.throttle'
import { Cursor } from './component/Cursor'

const renderCursors = users => {
    return Object.keys(users).map(uuid => {
        const user = users[uuid]

        return (
            <Cursor key={uuid} point={[user.state.x , user.state.y]} />
        )
    })
}

const renderUserList = users => {
    return (
        <u>
            {Object.keys(users).map(uuid => {
                return <li key={uuid}>{JSON.stringify(users[uuid])}</li>
            })}
        </u>
    )
}

function Home({userName}) {

  const WS_URL = 'ws://127.0.0.1:8000'  
  const {sendJsonMessage , lastJsonMessage} = useWebSocket(WS_URL,{
    queryParams : {username:userName}
  })  

  const THROTTLE = 50
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

  useEffect(() => {
    // ask to server to send everyone's state the second we load the compenent
    sendJsonMessage({
        x:0,
        y:0
    })
    window.addEventListener("mousemove", e => {
        sendJsonMessageThrottled.current({
            x : e.clientX ,
            y : e.clientY
        })
        // send 
        // e.clientX
        // e.clientY
    })
  },[])

  if (lastJsonMessage){
    return <>
        {renderCursors(lastJsonMessage)}
        {renderUserList(lastJsonMessage)}
    </>
  }
    
  return (
    <div>Hello , {userName}</div>
  )
}

export default Home