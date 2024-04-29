import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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
    <div className="edit-form">
      {!showInput ? (
        <button onClick={handleClick} aria-label="Edit List Title">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      ) : (
        <form onSubmit={(e) => handleSubmit(e, id)}>
          <input
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Enter new title"
          />
          <button type="submit" aria-label="Submit">
            ✔️
          </button>
        </form>
      )}
    </div>
  );
};
