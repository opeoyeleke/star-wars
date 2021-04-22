import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Films from "./components/Films";
import FilmItem from "./components/Films/FilmItem";
import People from "./components/People";
import Person from "./components/People/Person";
import Starships from "./components/Starships";
import Starship from "./components/Starships/Starship";
import Vehicles from "./components/Vehicles";
import Vehicle from "./components/Vehicles/Vehicle";
import Species from "./components/Species";
import Specie from "./components/Species/Specie";
import Planets from "./components/Planets";
import Planet from "./components/Planets/Planet";
import "./App.css";

const App: FC = (props) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Films} />
        <Route exact path="/films" component={Films} />
        <Route exact path="/films/:id" component={FilmItem} />
        <Route exact path="/people" component={People} />
        <Route exact path="/people/:id" component={Person} />
        <Route exact path="/starships" component={Starships} />
        <Route exact path="/starships/:id" component={Starship} />
        <Route exact path="/vehicles" component={Vehicles} />
        <Route exact path="/vehicles/:id" component={Vehicle} />
        <Route exact path="/species" component={Species} />
        <Route exact path="/species/:id" component={Specie} />
        <Route exact path="/planets" component={Planets} />
        <Route exact path="/planets/:id" component={Planet} />
      </Switch>
    </div>
  );
};

export default App;
