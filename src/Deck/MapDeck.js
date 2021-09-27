import React from 'react';
import RenderDeck from './RenderDeck';


const MapDeck = ({ decks, setDecks }) => {
    const list = decks.map((deck) => <RenderDeck key={deck.id} deck={deck} setDecks={setDecks} />);

    return (
        <section className='container'>
            <div className='row'>
                {list}
            </div>
        </section>
    );
}

export default MapDeck;