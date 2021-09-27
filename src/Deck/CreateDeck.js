import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';


export const CreateDeck = () => {
    const history = useHistory();
    const initalFormData = {
        name: '',
        description: '',
    };
    const [formData, setFormData] = useState({ ...initalFormData });
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };
    const handleCancel = () => {
        history.push('/');
    };
    const handleSubmit = (event) => {
        event.preventDefault();
          const abortController = new AbortController();
        async function addDeck(){
            const newDeck = await createDeck(formData, abortController.signal);
            setFormData({ ...initalFormData });
            history.push(`/decks/${newDeck.id}`);
        }
        addDeck();        
    };
    if (!formData) {
        return 'Loading...';
    } else {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/'>
                                <span className='oi oi-home mr-2'></span>
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                    </ol>
                </nav>
                <h2>Create Deck</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            className="form-control" 
                            id="name" 
                            name='name'
                            rows="3" 
                            placeholder='Deck Name'
                            onChange={handleChange}
                            value={formData.name}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            className="form-control" 
                            id="description" 
                            name='description'
                            rows="3" 
                            placeholder='Brief description of the deck'
                            onChange={handleChange}
                            value={formData.description}
                        ></textarea>
                    </div>
                    <button className='btn btn-secondary' onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className='btn btn-primary' onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </>
        );
    }
};

export default CreateDeck;