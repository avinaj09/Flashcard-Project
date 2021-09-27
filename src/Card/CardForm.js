import React from 'react';
import { useHistory } from 'react-router-dom';


export default function CardForm({ formData, setFormData, isNew, onSuccess, deck}) {
    const history = useHistory();
    
    const handleRedirect = () => {
        return history.push(`/decks/${deck.id}`);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        await onSuccess(formData.front, formData.back);
        isNew ? setFormData({ front: '', back: ''}) : setFormData({ ...formData });
        return isNew ? history.push(`/decks/${deck.id}/cards/new`) : history.push(`/decks/${deck.id}`);
    }
    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }
        return (
        <form onSubmit={handleSubmit}>
            <div>
            <h2>{isNew ? "Add card" : "Edit card"}</h2>
            </div>
            <div className='form-group'>
            <label htmlFor="front">Front</label>
            <textarea 
                className='form-control'
                value={formData.front} 
                onChange={handleInputChange} 
                placeholder={isNew ? 'Front side of card' : null}
                name='front' 
                id='front' 
                rows='3'
            ></textarea>
            </div>
            <div className='form-group'>
            <label htmlFor="back">Back</label>
            <textarea 
                className='form-control'
                value={formData.back} 
                onChange={handleInputChange} 
                placeholder={isNew ? 'Back side of card' : null }
                name='back' 
                id='back'  
                rows="3"
            ></textarea>
            </div>
            <div>
            <button className='btn btn-secondary' 
                type="button"
                onClick={handleRedirect}
            >
                { isNew ? "Done" : "Cancel" }
            </button>
            <button className='btn btn-primary' type="submit">
                { isNew ? "Save" : "Submit" }
            </button>
            </div>
        </form>
        );
}