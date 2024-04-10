import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ChatPage from './chat-page/chat-page'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/Chatbot" element={<ChatPage />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
