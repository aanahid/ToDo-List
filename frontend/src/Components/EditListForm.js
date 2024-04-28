import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"

export const EditListForm = ({ fetchItems, id }) => {
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
      await axios.put(`http://localhost:3000/edit/${id}`, { title });
      setTitle("");
      setShowInput(false);
    } catch (error) {
      console.error("Error editing list:", error);
    }
    fetchItems();
  };

  return (
    <div>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={ faPenToSquare }/>
      </button>
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
