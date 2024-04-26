import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ListForm } from "./Components/ListForm";
import { TaskForm } from "./Components/TaskForm";
import { EditListForm } from "./Components/EditListForm";
import { EditTaskForm } from "./Components/EditTaskForm";

function App() {
  const [lists, setLists] = useState([]);
  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    fetchItems();
    const isDarkMode = localStorage.getItem("darkMode") | true;
    setDarkMode(isDarkMode);
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

  const handleRemoveList = async (e, id) => {
    await axios.delete(`http://localhost:3000/lists/${id}`);
    fetchItems();
  };

  const handleRemoveTask = async (e, id, tid) => {
    await axios.delete(`http://localhost:3000/lists/${id}/${tid}`);
    fetchItems();
  };

  return (
    <div id="page" className={darkMode ? "dark-mode" : ""}>
      <button onClick={() => setDarkMode((prevMode) => !prevMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            {list.title}
            <button onClick={(e) => handleRemoveList(e, list.id)}>✖️</button>
            <EditListForm fetchItems={fetchItems} id={list.id} />
            <ul>
              {list.tasks.map((t) => (
                <li key={t.id}>
                  {t.title}
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheck(e, t.id)}
                  />
                  <button onClick={(e) => handleRemoveTask(e, list.id, t.id)}>
                    ✖️
                  </button>
                  <EditTaskForm fetchItems={fetchItems} id={t.id} />
                </li>
              ))}
              <TaskForm fetchItems={fetchItems} id={list.id} />
            </ul>
          </li>
        ))}
        <ListForm fetchItems={fetchItems} />
      </ul>
    </div>
  );
}

export default App;
