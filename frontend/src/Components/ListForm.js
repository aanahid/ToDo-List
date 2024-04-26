import React, {useState} from "react"
import axios from 'axios';

export const ListForm = ({ updateList }) => {
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
            const response = await axios.post('http://localhost:3000/lists', { title });
            setTitle('');
            setShowInput(false);
            updateList(response.data);
        } catch (error) {
            console.error('Error creating list:', error);
        }
      };

    return (
        <div>
            <button onClick={handleClick}>Create List</button>
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