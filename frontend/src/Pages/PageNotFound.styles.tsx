import styled from 'styled-components';

export const PageNotFoundStyled = styled.div`
  border-radius: 1rem;
  width: 70vw;
  text-align: center;
  margin: 0 auto;
  padding: 2rem;
  background: #ffcce6;

  h3 {
    font-weight: bold;
  }
`;

export const ImageStyled = styled.img`
  width: 50%;
  border-radius: 2rem;
  padding-bottom: 2rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
