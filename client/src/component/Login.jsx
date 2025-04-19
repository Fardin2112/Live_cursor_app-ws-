import React, { useState } from 'react'

function Login({onSubmit}) {
    const [userName, setUserName] = useState("")
  return (
    <>
        <h1>Hello</h1>
        <p>What should people call you</p>
        <form onSubmit={(e)=> {
            e.preventDefault()
            onSubmit(userName)
        }}>
            <input type="text"
            value={userName}
            placeholder='username'
            onChange={(e)=> setUserName(e.target.value)}
            />
            <input type="submit" />
        </form>
    </>
  )
}

export default Login