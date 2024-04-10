import React from "react";
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar.jsx";
import styles from "./Home.module.css";
import neuralnetwork from "../assets/neural.png";

function Home(){
    return(
        <>
            <NavBar />
            <div className={styles.HomeContainer}>
                <h1 className={styles.HomeHeadline}>Discover Your Perfect Tune with MelodyMatch: Your Personalized Music Recommendation Platform!</h1>
                <Link to="/Chatbot" className={styles.button}>Get Started</Link>
            </div>
            <img className={styles.NeuralImage} src={neuralnetwork}></img>
        </>
    )
};


export default Home;