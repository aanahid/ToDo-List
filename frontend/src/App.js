import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { ListForm } from "./Components/ListForm";
import { TaskForm } from "./Components/TaskForm";
import { EditListForm } from "./Components/EditListForm";
import { EditTaskForm } from "./Components/EditTaskForm";
import { Bored } from "./Components/Bored";

function App() {
  const [lists, setLists] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    // If storedMode is null (not set in localStorage), default to false (light mode)
    return storedMode ? JSON.parse(storedMode) : false;
  });
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    // Update localStorage when darkMode changes
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/lists");
      console.log(response.data);
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const handleRemoveList = async (e, id) => {
    await axios.delete(`http://localhost:3000/lists/${id}`);
    fetchItems();
  };

  const handleRemoveTask = async (e, id, tid) => {
    await axios.delete(`http://localhost:3000/lists/${id}/${tid}`);
    fetchItems();
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

  return (
    <div id="page" className={darkMode ? "dark-mode" : ""}>
      <div id="content">
        <button
          id="dark-toggle"
          aria-label="Dark mode toggle"
          className="icon-button"
          onClick={() => setDarkMode((prevMode) => !prevMode)}
        >
          {darkMode ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </button>
        <h1>Welcome to GamePlan</h1>
        <span>Track your tasks with to-do lists!</span>

        <div className="lists-container">
          <ul className="lists">
            {lists.map((list) => (
              <li key={list.id}>
                <div className="list-header">
                  <h2>
                    <span className="list-title">{list.title}</span>
                  </h2>
                  <div className="actions">
                    <EditListForm fetchItems={fetchItems} id={list.id} />
                  </div>
                  <button
                    id="remove-button"
                    aria-label="Remove List"
                    onClick={(e) => handleRemoveList(e, list.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
                <ul className="tasks-list">
                  {list.tasks.map((t) => (
                    <li key={t.id}>
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheck(e, t.id)}
                        checked={t.completed}
                      />
                      <span className="item-title">{t.title}</span>
                      <div className="actions">
                        <EditTaskForm fetchItems={fetchItems} id={t.id} />
                      </div>
                      <button
                        id="remove-button-items"
                        aria-label="Remove List Item"
                        onClick={(e) => handleRemoveTask(e, list.id, t.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </li>
                  ))}
                  <TaskForm fetchItems={fetchItems} id={list.id} />
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <ListForm fetchItems={fetchItems} />
        </div>
      <Bored />
    </div>
  );
}

export default App;
