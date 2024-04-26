import React, { useState } from "react";
import axios from "axios";

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
      <button onClick={handleClick}>📝</button>
      {showInput && (
        <form onSubmit={(e) => handleSubmit(e, id)}>
          <input
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Enter something..."
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};
