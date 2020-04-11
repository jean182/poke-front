import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/header/Header";
import Home from "../components/home/Home";
import Pokedex from "../components/pokedex/Pokedex";

export const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pokedex">
          <Pokedex />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
