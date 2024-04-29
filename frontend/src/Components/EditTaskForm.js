import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

export const EditTaskForm = ({
  fetchItems,
  id,
  tid,
  currTitle,
  completed,
  lists,
}) => {
  const [title, setTitle] = useState(currTitle);
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e, tid) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/tasks/${tid}`, { title });
      setShowInput(false);
    } catch (error) {
      console.error("Error editing task:", error);
    }
    fetchItems();
  };

  return (
    <div>
      {!showInput ? (
        <button onClick={handleClick} aria-label="Edit Task">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      ) : (
        <form onSubmit={(e) => handleSubmit(e, id)}>
          <input type="text" value={title} onChange={handleChange} />
          <button type="submit">
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
        </form>
      )}
    </div>
  );
};
