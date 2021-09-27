import React from 'react';
import CardView from './CardView';


export const CardList = ({ cards, setCards}) => {
    

    const list = cards.map((card) => <CardView key={card.id} card={card} setCards={setCards} />)
    
    return (
        <section className='container'>
            <div className='row'>
                {list}
            </div>
        </section>
    );
};

export default CardList;