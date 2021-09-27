import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/index";
import CreateDecks from "../Deck/CreateDeck";
import CreateCards from "../Card/CreateCard";
import StudyCards from "../Card/StudyCards";
import EditDeck from "../Deck/EditDeck";
import EditCard from "../Card/EditCard";
import ViewDeck from "../Deck/ViewDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/decks/new'>
            <CreateDecks />
          </Route>
          <Route exact path='/decks/:deckId'>
            <ViewDeck />
          </Route>
          <Route exact path='/decks/:deckId/study'>
            <StudyCards />
          </Route> 
          <Route exact path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route exact path='/decks/:deckId/cards/new'>
            <CreateCards />
          </Route> 
          <Route exact path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>   
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
