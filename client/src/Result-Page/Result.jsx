import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Result.module.css";

function Result({ inputValue, buttonClicked }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/fetch", {
          params: {
            input: inputValue, // Corrected the prop name to inputValue
            buttonClicked: buttonClicked
          }
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [inputValue, buttonClicked]); // Corrected the dependency array

  return (
    <div className={styles.resultContainer}>
      <h2 className={styles.heading}>Result</h2>
      {data ? (
        <div>
          <p className={styles.paragraph}>Input: {data.input}</p>
          <p className={styles.paragraph}>Button Clicked: {data.buttonClicked}</p>
        </div>
      ) : (
        <p className={styles.error}>Loading...</p>
      )}
    </div>
  );
}

export default Result;
