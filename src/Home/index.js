import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";
import MapDeck from "../Deck/MapDeck";

export default function Home() {
  const [ decks, setDecks ] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      const decksData = await listDecks(abortController.signal);
      setDecks(decksData);
    }
    fetchDecks();

  }, [setDecks]);

  return (
    <div>
      <div className="actions">
        <Link to="/decks/new" className="btn btn-secondary">
            <span className="oi oi-plus mr-2"></span>
            Create Deck
        </Link>
      </div>
      <div>
        <MapDeck decks={decks} setDecks={setDecks}/>
      </div>
    </div>
  );
}