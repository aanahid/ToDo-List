import React, {useState} from "react"
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"

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
            {!showInput && (
                <button onClick={handleClick}>
                    <FontAwesomeIcon icon={ faCirclePlus }/> New Task
                </button>
            )}
            {showInput && (
                <div>
                    <button onClick={handleClick}>
                        <FontAwesomeIcon icon={ faCircleMinus }/> New Task
                    </button>
                    <form onSubmit={handleSubmit}>
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
                </div>
            )}
        </div>
    );

}