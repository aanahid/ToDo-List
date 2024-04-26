import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

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

  return (
    <div>
      <ul>
        {lists.map(list => (
          <li key={list.id}>
            {list.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
