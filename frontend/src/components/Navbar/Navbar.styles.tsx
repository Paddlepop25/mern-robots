import styled from 'styled-components';

export const NavbarStyled = styled.div`
  height: 4.1rem;
  width: 100vw;
  text-align: center;
  border-bottom: 0.25rem solid #db7093;
`;

export const UnorderedListStyled = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const ListStyled = styled.li`
  display: inline-block;
  padding-top: 1rem;
  font-size: 1.4rem;
`;

export const LinkStyled = styled.span`
  a {
    text-decoration: none;
    padding: 1.2rem 1.6rem;
    font-weight: bold;
    color: #333;
  }

  a:hover {
    color: #fff;
    background: #db7093;
  }

  @media only screen and (max-width: 446px) {
    a {
      font-size: 1.2rem;
      padding: 1.2rem 0.8rem;
    }
  }
`;
