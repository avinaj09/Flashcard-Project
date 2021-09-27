import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';
import CardForm from './CardForm';

export const EditCard = () => {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({});
    const [ formData, setFormData ] = useState({});
    useEffect(() => {
        const ac = new AbortController();
        async function getDeck(){
            const deckData = await readDeck(deckId, ac.signal);
            setDeck(deckData);
        }
        getDeck();
    }, [deckId])
    useEffect(() => {
        const ac = new AbortController();
        async function getCard(){
            const cardData = await readCard(cardId, ac.signal);
            setFormData({ ...cardData });
        }
        getCard();
    }, [deckId, cardId])
    function editCurrentCard(front, back){
        const card = {
            id: formData.id,
            deckId: formData.deckId,
            front: front,
            back: back
        }
        const ac = new AbortController();
        return updateCard(card, ac.signal);
    }    
    if (!deck.id && !formData.back){
        return "Fetching card data";
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
                                Deck {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                    </ol>
                </nav>
                <CardForm 
                    formData={formData}
                    setFormData={setFormData}
                    isNew={false} 
                    onSuccess={editCurrentCard} 
                    deck={deck}
                />
            </>
        );
    }
};

export default EditCard;