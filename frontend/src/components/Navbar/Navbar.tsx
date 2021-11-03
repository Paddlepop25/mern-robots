import React from 'react';
import { Link } from 'react-router-dom';
import {
  LinkStyled,
  ListStyled,
  NavbarStyled,
  UnorderedListStyled,
} from './Navbar.styles';

const Navbar = () => {
  return (
    <NavbarStyled>
      <UnorderedListStyled>
        <ListStyled>
          <LinkStyled>
            <Link to='/'>Adage</Link>
          </LinkStyled>
          <LinkStyled>
            <Link to='/form'>Form</Link>
          </LinkStyled>
          <LinkStyled>
            <Link to='/robots'>Robots</Link>
          </LinkStyled>
        </ListStyled>
      </UnorderedListStyled>
    </NavbarStyled>
  );
};

export default Navbar;
