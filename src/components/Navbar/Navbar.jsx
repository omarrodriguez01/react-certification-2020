import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import { MenuItemsLogged } from './MenuItemsLogged';
import './Navbar.css';
import { Button } from '../Button';
import { SearchContext } from '../../providers/SearchContext';
import { AuthContext } from '../../providers/Auth/AuthContext';

let Items = MenuItems;

const Navbar = () => {
  const searchIcon = React.createRef();
  const { MenuClick, SetMenuClick, SearchAPI, ClickSearch, SetClickSearch } = useContext(
    SearchContext
  );
  const { Logged, Logout } = useContext(AuthContext);
  const history = useHistory();
  console.log('logged 1? ', Logged());
  if (Logged()) {
    Items = MenuItemsLogged;
  } else {
    Items = MenuItems;
  }

  useEffect(() => {
    console.log('logged? ', Logged());
    if (Logged()) {
      Items = MenuItemsLogged;
    } else {
      Items = MenuItems;
    }
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('hi fuclke');
      console.log(event.target.value);
      // SearchAPI(event.target.value);
      history.push(`/search/${event.target.value}`); 
    }
  };
  const search = () => {
    if (!ClickSearch) {
      SetClickSearch(true);
      console.log(searchIcon.current.value);
      history.push(`/search/${searchIcon.current.value}`);
    }
    SetClickSearch(false);
  };
  return (
    <nav className="NavbarItems">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className="navbar-logo">
          Youtube <i className="fab fa-react" />
        </h1>
      </Link>
      <div className="top-left">
        <div
          className="menu-icon"
          onClick={() => (MenuClick ? SetMenuClick(false) : SetMenuClick(true))}
        >
          <i className={MenuClick ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <div className="center-block"> 
        <input ref={searchIcon} type="text" onKeyDown={handleKeyDown} />
          <i className="fas fa-search" onClick={search} />
        </div>
      </div>

      <ul className={MenuClick ? 'nav-menu active' : 'nav-menu'}>
        {Items.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
        {Logged() ? (
          <li key="5">
            <a className="nav-links" onClick={Logout} href="/">logout</a>
          </li>
        ) : (
          ''
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
