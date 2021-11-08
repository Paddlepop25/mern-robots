import styled from 'styled-components';

export const ButtonsStyled = styled.div`
  h3 {
    font-weight: bold;
  }

  button {
    margin-right: 0.5rem;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  @media only screen and (max-width: 520px) {
    button {
      width: 100%;
    }
`;
