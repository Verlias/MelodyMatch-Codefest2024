import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
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
