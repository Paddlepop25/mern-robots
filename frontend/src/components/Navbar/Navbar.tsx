import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarStyled } from './Navbar.styles';

const Navbar = () => {
  return (
    <>
      <NavbarStyled>
        <ul>
          <li>
            <Link to='/'>Did You Know?</Link>
            <Link to='/form'>Form</Link>
            <Link to='/entries'>Entries</Link>
          </li>
        </ul>
      </NavbarStyled>
    </>
  );
};

export default Navbar;
