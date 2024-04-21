import React from "react";
import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css";

function NavBar(){
    return(
        <>
            <nav className={styles.NavBar}>
                <h1 className={styles.NavHeadline}>MelodyMatch</h1>
                <ul>
                    <li>
                        <Link className={styles.Links} to="/Home">Home</Link>
                    </li>
                    <li>
                        <Link className={styles.Links} to="/About">Who we Are</Link>
                    </li>
                    <li>
                        <Link className={styles.LoginLink} to="/Login">Login/Register</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
};

export default NavBar;