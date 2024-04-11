import React from 'react';
import styles from './chatpage.module.css';

function ChatPage(){
    return (
        <div className={styles.chatPageContainer}>
            <div className={styles.chatHistory}>
                <button className={styles.profileButton}>Profile</button>
            </div>
            <div className={styles.chatBoxContainer}>
                <h1 className={styles.title}>MelodyMatch</h1>
                <div className={styles.chatContainer}></div>
                <input className={styles.userInput} 
                type="text" 
                placeholder="Type a message..." />
            </div>
        </div>
    );
}

export default ChatPage;

