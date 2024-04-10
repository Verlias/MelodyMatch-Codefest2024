import React from 'react';
import styles from './chatpage.module.css';

function ChatPage(){
    return (
        <div className={styles.chatPageContainer}>
            <div className={styles.chatHistory}>
                <h2 className={styles.Headline}>Chat History</h2>
            </div>
            <div className={styles.chatContainer}>
                <div className={styles.inputContainer}>
                    <div className={styles.messages}>
                        hello....
                    </div>
                    <input type="text" placeholder="Type a message..." />
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;

