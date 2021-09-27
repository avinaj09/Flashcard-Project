import React from 'react';
import { Link, useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { deleteCard, listCards } from '../utils/api';

export const CardView = ({ card, setCards }) => {
    const { deckId } = useParams();
    const history = useHistory();
    const { url } = useRouteMatch();
    const handleDelete = async () => {
        const ac = new AbortController();
        const result = window.confirm('Delete this card?\n\nYou will not be able to recover it');
        if (result) {
            await deleteCard(card.id, ac.signal);
            const data = await listCards(deckId, ac.signal);
            setCards(data);
            history.push(`/decks/${deckId}`);
        }
    };

    return (
        <div className='col col-12'>
            <div className="card">
                <div className="card-body">
                    <div className='col'>
                        <p>{card.front}</p>
                    </div>
                    <div className='col'>
                        <p>{card.back}</p>
                        <Link to={`${url}/cards/${card.id}/edit`}>
                            <button className='btn btn-secondary'>
                                <span className='oi oi-pencil mr-2'></span>
                                Edit
                            </button>
                        </Link>
                        <button className='btn btn-danger' onClick={handleDelete}>
                            <span className='oi oi-trash'></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardView;