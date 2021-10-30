import styled from 'styled-components';

export const NavbarStyled = styled.div`
  // background: red;
  height: 4rem;
  width: 100vw;
  position: fixed;
  top: 0;
  text-align: center;
  border-bottom: 0.2rem solid #333;
`;

export const UnorderedListStyled = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const ListStyled = styled.li`
  padding-top: 1.2rem;
  font-size: 1.4rem;
`;

export const LinkStyled = styled.span`
  // background: green;
  a {
    text-decoration: none;
    padding: 1.3rem 2rem;
    font-weight: bold;
    color: #333;
  }

  a:hover {
    color: #fff;
    background: #333;
  }
`;
