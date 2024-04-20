import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import About from './AboutPage/About';
import ChatPage from './chat-page/chat-page';
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
      </Routes>
    </Router>
  );
}

export default App;
