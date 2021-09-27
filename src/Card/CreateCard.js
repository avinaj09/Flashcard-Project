import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';
import CardForm from './CardForm';

export const AddCard = () => {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [formData, setFormData] = useState({
        front: '',
        back: ''
    });
    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck(){
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
        }
        getDeck();
    }, [deckId])
    function newCard(front, back){
        const ac = new AbortController();
        return createCard(deckId, {front, back}, ac.signal);
    }
    // no deck.id load
    if (!deck.id) {
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
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>        
                <CardForm 
                    formData={formData} 
                    setFormData={setFormData}
                    isNew={true} 
                    onSuccess={newCard} 
                    deck={deck} 
                />
            </>
        );
    }
};

export default AddCard;