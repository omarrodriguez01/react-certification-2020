import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
// eslint-disable-next-line import/no-named-as-default
import SearchContext from '../providers/SearchContext';
import './App.css';

import Home from './routes/Home/Home';
import WatchVideo from './routes/WatchVideo/WatchVideo';
import Login from './routes/Login';
import Favorites from './routes/Favorites/Favorites';
import AuthContext from '../providers/Auth/AuthContext';
import FavsContext from '../providers/FavsContext';
import SearchResults from './routes/SearchResults/SearchResults';
import Private from './Private/Private';

const App = () => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <SearchContext>
        <AuthContext>
          <FavsContext>
            <BrowserRouter>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/watch/:id" component={WatchVideo} />
                <Route path="/search/:word" component={SearchResults} />
                <Route path="/login" component={Login} />
                <Private exact path="/favorites">
                  <Favorites />
                </Private>
              </Switch>
            </BrowserRouter>
          </FavsContext>
        </AuthContext>
      </SearchContext>
    </div>
  );
};

export default App;
