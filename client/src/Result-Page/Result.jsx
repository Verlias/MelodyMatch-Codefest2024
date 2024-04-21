import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Result.module.css";

function Result() {
  const [data, setData] = useState(null); // Initialize data as null

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/submit", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setData(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.resultContainer}>
      <h2 className={styles.heading}>Result</h2>
      {data !== null ? ( // Check if data is not null
        <div>
          <p className={styles.paragraph}>Input: {data.input}</p>
          <p className={styles.paragraph}>Button Clicked: {data.buttonClicked}</p>
        </div>
      ) : (
        <p className={styles.error}>No data available</p>
      )}
    </div>
  );
}

export default Result;
