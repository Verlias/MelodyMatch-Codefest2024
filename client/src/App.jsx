import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';


function App() {
  

  return (
    <>
      <Router>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
