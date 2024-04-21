import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import About from './AboutPage/About';
import ChatPage from './chat-page/chat-page';
import Result from './Result-Page/Result.jsx'
import ParticlesComponent from "./components/particles";



function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/About"
          element={
            <div className="AboutSection">
              <div className="ParticlesContainer">
                <ParticlesComponent id="particles" />
              </div>
              <About />
            </div>
          }
        />
        <Route path="/Chatbot" element={<ChatPage />} />
        <Route path="/Result" element={<Result />}/>
      </Routes>
    </Router>
  );
}

export default App;
