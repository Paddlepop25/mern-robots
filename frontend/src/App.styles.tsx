import styled from 'styled-components';

export const PageContainerStyled = styled.div`
  position: relative;
  min-height: 100vh;
`;

export const PageContentWrap = styled.div`
  padding-bottom: 6rem;

  @media only screen and (max-width: 768px) {
    padding-bottom: 14rem;
  }
`;

export const PageBody = styled.div`
  margin: 4rem auto;
`;
