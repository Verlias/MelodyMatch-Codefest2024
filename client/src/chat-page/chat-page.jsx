import React, { useState, useEffect } from 'react';
import styles from './chatpage.module.css';

function ChatPage() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "src/scripts/notescript.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

  const [activeButton, setActiveButton] = useState('CombinedAlgo');
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    console.log(`Clicked ${buttonName}`);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submission logic here, such as sending the input value to a backend or performing some action
    console.log(`Clicked ${activeButton} and submitted input: ${inputValue}`);
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
      <canvas id="canvas" style={{ position: "absolute", left: "50%", top: "25%", transform: "translate(-50%, 0)", zIndex: 999 }}></canvas>
      <section className={styles.ChatbotSection}>
        <div className={styles.HeadlineSection}>
          <h1 className={styles.ChatHeadline}>Melody Match</h1>
          <h3 className={styles.HeadlineDescription}>Your everyday AI music recommender system</h3>
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
        </div>
      </section>
    </>
  );
}

export default ChatPage;
