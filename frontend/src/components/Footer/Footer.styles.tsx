import styled from 'styled-components';

export const FooterStyled = styled.footer`
  background: #f78193;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 6rem;

  @media only screen and (max-width: 768px) {
    height: 14rem;
  }
`;

export const FooterUnorderedListStyled = styled.ul`
  list-style-type: none;
  padding-top: 0.2rem;
`;

export const FooterListStyled = styled.li`
  font-size: 1.1rem;
`;

export const FooterIconStyled = styled.span`
  a {
    padding-right: 0.5rem;
    color: #333;
    font-size: 1.5rem;
  }

  a:hover {
    color: #fff;
  }
`;
