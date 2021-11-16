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
            <Link to='/'>🤖</Link>
          </LinkStyled>
          <LinkStyled>
            <Link to='/adage'>Adage</Link>
          </LinkStyled>
          <LinkStyled>
            <Link to='/robots'>Robots</Link>
          </LinkStyled>
          <LinkStyled>
            <Link to='/create'>Spawn</Link>
          </LinkStyled>
        </ListStyled>
      </UnorderedListStyled>
    </NavbarStyled>
  );
};

export default Navbar;
