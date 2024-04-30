import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export const EditTaskForm = ({
  fetchItems,
  id,
  tid,
  currTitle,
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

  const handleRemoveTask = async (e, id, tid) => {
    await axios.delete(`http://localhost:3000/lists/${id}/${tid}`);
    fetchItems();
  };

  return (
    <div>
        {showInput ? (
        <form onSubmit={(e) => handleSubmit(e, id)}>
          <input
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Enter something..."
          />
          <button type="submit">
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
        </form>
      ) : (
        <div className="row">
          <span className="item-title">{title}</span>
          <div className="actions">
            <button onClick={handleClick}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button 
              aria-label="Remove Task"
              onClick={(e) => handleRemoveTask(e, id, tid)}>
              <FontAwesomeIcon icon={ faTrashCan }/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
