import styled from 'styled-components';

export const AdageStyled = styled.div`
  border-radius: 1rem;
  width: 70vw;
  margin: 0 auto;
  margin-bottom: 3rem;
  padding: 3rem;
  background: #ffcce6;

  h3 {
    font-weight: bold;
  }

  @media only screen and (max-width: 520px) {
    padding: 1rem;

    button {
      width: 100%;
    }
  }
`;

export const CodeStyled = styled.code`
  font-size: 1.5rem;
`;

export const SpinnerStyled = styled.div`
  text-align: center;
`;

export const AdageAnswerStyled = styled.h5`
  font-style: italic;
`;

export const AdageQuoteStyled = styled.h5`
  font-style: italic;
`;
