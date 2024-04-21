import React from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar.jsx";
import styles from "./Home.module.css";
//import neuralnetwork from "../assets/neural.png";

function Home(){
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "src/scripts/script.js";
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
                <button className={styles.button} onClick={() => window.location.href = 'http://127.0.0.1:5000/'}>Go to URL</button>
            </div>
            <canvas id="canvas" style={{ position: "absolute", left: 0, top: 0, zIndex: -9999 }}></canvas>
        </>
    )
};


export default Home;
