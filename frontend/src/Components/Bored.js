import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

export const Bored = () => {
  const [activity, setActivity] = useState("");

  useEffect(() => {
    getActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActivity = async () => {
    try {
      const response = await axios.get(
        `https://www.boredapi.com/api/activity/`
      );
      setActivity(response.data.activity);
    } catch (error) {
      console.error("Error getting activity:", error);
    }
  };

  const handleNew = async () => {
    try {
      getActivity();
    } catch (error) {
      console.error("Error getting new activity:", error);
    }
  };

  return (
    <div className="bored-container">
      <h3>Bored?</h3>
      <p>{activity}!</p>
      <button className="button-text" onClick={handleNew}>
        <FontAwesomeIcon icon={faShuffle} /> Get new suggestion
      </button>
    </div>
  );
};
