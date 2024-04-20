import React from 'react';
import styles from './Profile.module.css';
import NavBar from '../NavBar/NavBar.jsx'


function Profile () {
    return (
        <>
        <div>
        <NavBar />
        </div>

            <div>
            <section className={styles.profileBackground}>
            </section>
                </div>

                <div>
            <h1> className={styles.nameColor} Leo </h1>
            <Button onClick= {styles.Follow}> Follow </Button>
            </div>

            <div>
            <img> backgroundPicture = {styles.backgroundPicture} </img>
            </div>

            <div>
            <img> profilePicture = {styles.profilePicture} </img>
            </div>

            <div>
            <Box InformationBox =  {styles.InformationBox} >
                <h1> User Info  </h1>
                <p> City: Philadelphia</p>
                <p> Age: 18</p>
                <p> Account Age: 2 Years </p>
            </Box>

            <Box songBox = {styles.songBox} >
                <p> Favorite Song: Sometimes - My Bloody Valentine</p>
                <p> Favorite Music Genre: Ethereal Cloud Rap</p>
                <p> Favorite Artist: Bladee </p>
            </Box>
            </div>
            
            
        </>
    )
}


export default Profile

