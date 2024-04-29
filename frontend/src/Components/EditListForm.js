import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"

export const EditListForm = ({ fetchItems, id, currTitle }) => {
  const [title, setTitle] = useState(currTitle);
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
      setShowInput(false);
    } catch (error) {
      console.error("Error editing list:", error);
    }
    fetchItems();
  };

  const handleRemoveList = async (e, id) => {
    await axios.delete(`http://localhost:3000/lists/${id}`);
    fetchItems();
  };

  return (
    <div className="edit-form">
      {!showInput ? (
        <button onClick={handleClick} aria-label="Edit List Title">
          📝
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
      ) : (
        <div>
          <span>{title}</span>
          <button onClick={handleClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button onClick={(e) => handleRemoveList(e, id)}>
              <FontAwesomeIcon icon={ faTrashCan }/>
            </button>
        </div>
      )}
    </div>
  );
};
