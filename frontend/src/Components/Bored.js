import React, { useState, useEffect } from "react"
import axios from 'axios';

export const Bored = () => {
    const [activity, setActivity] = useState("");

    useEffect(() => {
        getActivity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getActivity = async () => {
        try {
            const response = await axios.get(`https://www.boredapi.com/api/activity/`);
            setActivity(response.data.activity);
            console.log(activity);
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
        <div>
            <h3>Bored?</h3>
            <p>{activity}</p>
            <button onClick={handleNew}>🔄️</button>
        </div>
    )
}