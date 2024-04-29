import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
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

  const handleCheck = async (e, taskId) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${taskId}`, {
        completed: !lists
          .find((list) => list.tasks.some((task) => task.id === taskId))
          .tasks.find((task) => task.id === taskId).completed,
      });
      fetchItems();
    } catch (error) {
      console.error("Error checking task:", error);
    }
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
      {!showInput ? (
        <button onClick={handleClick} aria-label="Edit Task">
          📝
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
      )} : (
        <div>
          <span>{title}</span>
          <input
            type="checkbox"
            onChange={(e) => handleCheck(e, tid)}
            checked={completed}
          />
          <button onClick={handleClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button onClick={(e) => handleRemoveTask(e, id, tid)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      )
    </div>
  );
};
