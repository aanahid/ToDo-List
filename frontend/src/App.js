import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  return (
    <div id="page" className={darkMode ? "dark-mode" : ""}>
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
      <ul className="lists">
        {lists.map((list) => (
          <li key={list.id}>
            <EditListForm
              fetchItems={fetchItems}
              id={list.id}
              currTitle={list.title}
            />
            <ul className="tasks-list">
              {list.tasks.map((t) => (
                <li key={t.id}>
                  <EditTaskForm
                    fetchItems={fetchItems}
                    id={list.id}
                    tid={t.id}
                    currTitle={t.title}
                    completed={t.completed}
                    lists={lists}
                  />
                </li>
              ))}
              <TaskForm fetchItems={fetchItems} id={list.id} />
            </ul>
          </li>
        ))}
        <ListForm fetchItems={fetchItems} />
      </ul>
      <Bored />
    </div>
  );
}

export default App;
