import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export const EditTaskForm = ({ fetchItems, id }) => {
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/tasks/${id}`, { title });
      setTitle("");
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
          <input
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Edit task"
          />
          <button type="submit" aria-label="Submit">
            ✔️
          </button>
        </form>
      )}
    </div>
  );
};
