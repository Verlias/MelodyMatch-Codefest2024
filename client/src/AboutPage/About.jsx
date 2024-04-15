import React from "react";
import { Link } from "react-router-dom"
import NavBar from "../NavBar/NavBar.jsx";
import styles from "./About.module.css";
import scikit from "../assets/scikit.png";

function About(){
    return(
        <>
            <NavBar />
            <section className={styles.AboutSection}>
                <h1 className={styles.AboutHeadLine}>About Us</h1>
                <hr className={styles.LineBreak}></hr>
                <div className={styles.AboutContent}>
                    <p className={styles.AboutP}>
                        Welcome to MelodyMatch, where music meets machine learning! At MelodyMatch, we're passionate about connecting music lovers with their perfect tunes through cutting-edge technology.
                    </p>
                    <p className={styles.AboutP}>
                        Our app utilizes the Spotify API to access a vast library of songs, allowing users to discover new tracks and rediscover old favorites with ease. But we don't stop there. We leverage the power of machine learning, specifically scikit-learn, to provide personalized music recommendations tailored to each user's unique tastes.
                    </p>
                    <p className={styles.AboutP}>
                        Whether you're into pop, rock, jazz, or anything in between, MelodyMatch has you covered. Our intuitive interface makes it simple to explore new genres, create custom playlists, and connect with fellow music enthusiasts.
                    </p>
                    <p className={styles.AboutP}>
                        Join us on a journey of musical exploration and discovery. Let MelodyMatch be your guide to a world of endless melodies. Start your musical adventure today!
                    </p> 
                    <p className={styles.AboutP}>
                        Check our source code out:
                    </p>
                    <div className={styles.GitHubLink}><a className={styles.GitHubLink} href="https://github.com/Verlias/Financy" target="_blank" class="github"> <svg className={styles.GitHubLink} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" class="bi bi-github" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg></a></div>
                    <img src={scikit} alt="scikit-learn" className={styles.ScikitLogo}></img> 
                </div>
                
            </section>
        </>
    )
};



export default About