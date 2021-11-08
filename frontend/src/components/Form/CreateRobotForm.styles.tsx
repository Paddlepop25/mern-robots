import styled from 'styled-components';

export const FormStyled = styled.div`
  border-radius: 1rem;
  width: 70vw;
  margin: 0 auto;
  padding: 3rem;
  background: #ffcce6;

  h3 {
    font-weight: bold;
  }

  @media only screen and (max-width: 520px) {
    padding: 1rem;
  }
`;

export const ButtonsStyled = styled.div`
  button {
    margin-right: 0.5rem;
  }

  @media only screen and (max-width: 520px) {
    button {
      width: 100%;
    }
`;
