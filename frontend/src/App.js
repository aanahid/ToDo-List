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
                  <EditListForm fetchItems={fetchItems} id={list.id} currTitle={list.title}/>
                </div>
                <ul className="tasks-list">
                  {list.tasks.map((t) => (
                    <li key={t.id}>
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheck(e, t.id)}
                        checked={t.completed}
                      />
                      <EditTaskForm 
                      fetchItems={fetchItems} 
                      id={list.id}
                      tid={t.id}
                      currTitle={t.title}/>
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
