import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ListForm } from "./Components/ListForm"

function App() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/lists');
      console.log(response.data);
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  }

  const updateList = (newList) => {
    setLists([...lists, newList]);
  };

  return (
    <div>
      <ul>
        {lists.map(list => (
          <li key={list.id}>
            {list.title}
          </li>
        ))}
        <ListForm updateList={updateList}/>
      </ul>
    </div>
  );
}

export default App;
