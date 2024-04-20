import React, { useState } from 'react';
import styles from './chatpage.module.css';

function ChatPage() {
  const [activeButton, setActiveButton] = useState('CombinedAlgo');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submission logic here, such as sending the input value to a backend or performing some action
    console.log('Submitted input:', inputValue);
    // Clear the input field after submission
    setInputValue('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <section className={styles.ChatbotSection}>
        <div className={styles.HeadlineSection}>
          <h1 className={styles.ChatHeadline}>Melody Match</h1>
          <h3 className={styles.HeadlineDescription}>Your everyday AI music reccomender system</h3>
        </div>
        <div className={styles.HeaderOptions}>
          <p className={styles.OptionHeadline}>Choose your groove style</p>
          <div className={styles.Features}>
            <button
              className={`${styles.FeatureAlgos} ${activeButton === 'GenreFiltering' ? styles.Active : ''}`}
              onClick={() => handleButtonClick('GenreFiltering')}
            >
              Genre Filtering
            </button>
            <button
              className={`${styles.CombinedAlgo} ${activeButton === 'CombinedAlgo' ? styles.Active : ''}`}
              onClick={() => handleButtonClick('CombinedAlgo')}
            >
              Balanced
            </button>
            <button
              className={`${styles.FeatureAlgos} ${activeButton === 'AudioFiltering' ? styles.Active : ''}`}
              onClick={() => handleButtonClick('AudioFiltering')}
            >
              Audio Filtering
            </button>
          </div>
        </div>
        <div className={styles.InputSection}>
        <input
            type="text"
            placeholder="Input your song name"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </section>
    </>
  );
}

export default ChatPage;
