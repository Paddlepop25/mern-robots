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
    <>
      <NavbarStyled>
        <UnorderedListStyled>
          <ListStyled>
            <LinkStyled>
              <Link to='/'>Did You Know?</Link>
            </LinkStyled>
            <LinkStyled>
              <Link to='/form'>Form</Link>
            </LinkStyled>
            <LinkStyled>
              <Link to='/my-favourites'>Robots</Link>
            </LinkStyled>
          </ListStyled>
        </UnorderedListStyled>
      </NavbarStyled>
    </>
  );
};

export default Navbar;
