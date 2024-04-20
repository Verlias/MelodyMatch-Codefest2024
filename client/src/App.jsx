import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import About from './AboutPage/About';
import ChatPage from './chat-page/chat-page'
import Profile from './ProfilePage/Profile'


function App() {
  

  return (
    <>
      <Router>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/About" element={<About />}/>
            <Route path="/Chatbot" element={<ChatPage />}/>
            <Route path="/Profile" element={<Profile />}/>
            
        </Routes>
      </Router>
    </>
  )
}

export default App
