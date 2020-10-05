import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { MenuItems, MenuItemsLogged } from './Navbar.options';
import './Navbar.css';
import { AuthContext } from '../../../providers/Auth/AuthContext';

let Items = MenuItems;

const Navbar = () => {
  const searchIcon = React.createRef();
  const [clickSearch, setClickSearch] = useState(false);
  const { userAuthenticated, Logout } = useContext(AuthContext);
  const history = useHistory();

  if (userAuthenticated) {
    Items = MenuItemsLogged;
  } else {
    Items = MenuItems;
  }
  useEffect(() => {
    if (userAuthenticated) {
      Items = MenuItemsLogged;
    } else {
      Items = MenuItems;
    }
  }, [userAuthenticated]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      history.push(`/search/${event.target.value}`);
    }
  };
  const search = () => {
    if (!clickSearch) {
      setClickSearch(true);
      history.push(`/search/${searchIcon.current.value}`);
    }
    setClickSearch(false);
  };
  return (
    <nav className="NavbarItems">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className="navbar-logo">
          Youtube <i className="fab fa-react" />
        </h1>
      </Link>
      <div className="top-left">
        <div className="center-block">
          <input ref={searchIcon} type="text" onKeyDown={handleKeyDown} />
          <i className="fas fa-search" onClick={search} />
        </div>
      </div>

      <ul className="nav-menu">
        {Items.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
        {userAuthenticated ? (
          <li key="5">
            <a className="nav-links" onClick={Logout} href="/">
              logout
            </a>
          </li>
        ) : (
          ''
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
