import "../../../src/App.css";
import React, { FC } from "react";

import { MyWatchList } from "../Pages";
import { Locations } from "../Pages/Locations/Locations";
import { Characters } from "../Pages/Characters/Characters";
import { Episodes } from "../Pages/Episodes/Episodes";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li class="menu_item">
              <Link to="/characters">Characters</Link>
            </li>
            <li class="menu_item">
              <Link to="/episodes">Episodes</Link>
            </li>
            <li class="menu_item">
              <Link to="/locations">Locations</Link>
            </li>
            <li class="menu_item">
              <Link to="/mywatchlist">MyWatchList</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/episodes">
            <Episodes />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/mywatchlist">
            <MyWatchList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
