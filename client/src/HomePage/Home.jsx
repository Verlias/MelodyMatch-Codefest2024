import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar.jsx";
import styles from "./Home.module.css";
import neuralnetwork from "../assets/neural.png";

function Home(){
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "src/scripts/mapscript.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    return(
        <>
            <NavBar />
            <div className={styles.HomeContainer}>
                <h1 className={styles.HomeHeadline}>Discover Your Perfect Tune with MelodyMatch: Your Personalized Music Recommendation Platform!</h1>
                <Link to="/Chatbot" className={styles.button}>Get Started</Link>
            </div>
            <canvas id="canvas"></canvas>
        </>
    )
};


export default Home;
