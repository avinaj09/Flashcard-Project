import React, { useState, } from 'react';
import { useHistory } from 'react-router-dom';

export const Card = ({ deck }) => {
    const history = useHistory();
    const [cards, setCards] = useState(deck.cards);
    const [cardSide, setCardSide] = useState(deck.cards[0].front);
    const [cardIndex, setCardIndex] = useState(0);
    const handleFlip = (event) => {
        event.preventDefault();
        if (cardSide === cards[cardIndex].front) {
            setCardSide(cards[cardIndex].back);
        }
        if (cardSide === cards[cardIndex].back) {
            setCardSide(cards[cardIndex].front);
        }
    };
    const handleNext = (event) => {
        event.preventDefault();
        setCardIndex((currentIndex) => currentIndex + 1);
        setCardSide(cards[cardIndex + 1].front);
    };
    const handleLast = async () => {
        const result = window.confirm("Restart Cards?\n\nClick 'cancel' to return to the home page");
        if (result) {
            setCards(deck.cards);
            setCardIndex(0);
            setCardSide(cards[0].front);
        } else {
            history.push('/');
        }
    } 
    if ((cardSide === cards[cardIndex].back) && (cardIndex + 1 === cards.length)){
        return (
            <div>
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                    <p className="card-text">{cardSide}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>
                        Flip
                    </button>
                    <button className="btn btn-primary" onClick={handleLast}>
                        Next
                    </button>
                </div>
            </div>
        );
    } else if (cardSide === cards[cardIndex].front) {
        return (
            <div>
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                    <p className="card-text">{cardSide}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>
                        Flip
                    </button>
                </div>
            </div>
        );
    } else if (cardSide === cards[cardIndex].back) {
        return (
            <div>
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                    <p className="card-text">{cardSide}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>
                        Flip
                    </button>
                    <button className="btn btn-primary" onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>
        );
    } else {
        return 'Not working';
    }
}

export default Card;