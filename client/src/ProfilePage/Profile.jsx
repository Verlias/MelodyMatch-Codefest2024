import React from 'react';
import styles from './Profile.module.css';
import NavBar from '../NavBar/NavBar.jsx';
import bladee333 from '../assets/bladee333.jpg';

function Profile () {
    return (
        <>
        <div>
            <NavBar />
        </div>


        <div className={styles.profileBackground} >
      {/* Background picture */}
      <div className="background-picture"></div>


      {/* Profile picture */}
      <div>
        <img
          src={bladee333}
          alt="bladee"
          className={styles.profile-picture-container}
        />

        <button className={styles.followButton}>Follow</button>
      </div>

      {/* user information */}
      <div className="container">
        {/* User information box */}
        <div className="user-info-box">
          <h2>User Information</h2>
          <p>City: Philadelphia </p>
          <p>Age: 18 </p>
          <p>Account Age: 2 years </p>
        </div>

        {/* Account information box */}
        <div className="account-info-box">
          <h2>Account Information</h2>
          <p>Favorite Artist: Bladee </p>
          <p>Favorite Song: Sometimes by My Bloody Valentine </p>
          <p>Favorite Genre: Cloud Rap </p>
        </div>
      </div>
    </div>
</>        
    )
}


export default Profile;

/*
<div>
        <NavBar />
        </div>

            <div>
            <section className={styles.profileBackground}>
            </section>
                </div>

                <div>
            <h1 className={styles.nameColor} Leo> </h1>
            <Button onClick= {styles.Follow}> Follow </Button>
            </div>

            <div>
            <img backgroundPicture = {styles.backgroundPicture}> </img>
            </div>

            <div>
            <img profilePicture = {styles.profilePicture}> </img>
            </div>


            <div className={styles.boxContainer}>
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
        */
