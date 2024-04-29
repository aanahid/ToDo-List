import React, {useState} from "react"
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons"
import { faSquareMinus } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"

export const ListForm = ({ fetchItems }) => {
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
            await axios.post('http://localhost:3000/lists', { title });
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
                    <FontAwesomeIcon icon={ faSquarePlus }/> New List
                </button>
            )}
            {showInput && (
                <div>
                    <button onClick={handleClick}>
                        <FontAwesomeIcon icon={ faSquareMinus }/> New List
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