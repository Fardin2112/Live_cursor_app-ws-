import React, { useState } from 'react'
import Login from './component/Login'
import Home from './Home';

function App() {
  const [userName, setUserName] = useState("");

  return userName ? (
    <Home userName={userName}/>
  ) : (
    <Login onSubmit={setUserName}/>
  )

  // return (
  //   <Login onSubmit={setUserName}/>
  // )

}

export default App