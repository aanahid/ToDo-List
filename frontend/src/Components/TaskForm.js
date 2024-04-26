import React, {useState} from "react"
import axios from 'axios';

export const TaskForm = ({ fetchItems, id }) => { 
    const [title, setTitle] = useState("");
    const [showInput, setShowInput] = useState(false);
    
    const handleClick = () => {
        setShowInput(!showInput);
    };

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/lists/${id}`, { title });
            setTitle('');
            setShowInput(false);
            fetchItems();
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Create Task</button>
            {showInput && (
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter something..."
                />
                <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );

}