import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import SearchProvider from '../providers/SearchProvider/SearchContext';
import './App.css';
import Home from './pages/Home/Home';
import WatchVideo from './pages/WatchVideo/WatchVideo';
import Login from './pages/Login';
import Favorites from './pages/Favorites/Favorites';
import AuthContext from '../providers/Auth/AuthContext';
import FavsContext from '../providers/FavsContext';
import SearchResults from './pages/SearchResults/SearchResults';
import Private from './Private/Private';

const App = () => {
  return (
    <div className="App">
      <SearchProvider>
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
      </SearchProvider>
    </div>
  );
};

export default App;
