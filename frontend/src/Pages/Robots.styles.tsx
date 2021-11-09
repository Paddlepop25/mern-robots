import styled from 'styled-components';

export const RobotsStyled = styled.div`
  h2 {
    text-align: center;
  }

  .card {
    width: 18rem;
    background: #ffcce6;
  }

  .card-img-top {
    transition: transform 0.8s;
  }

  .card-img-top: hover {
    transform: scale(1.08);
  }

  .card-body {
    text-align: center;
    margin: 1rem;
  }

  .capitalize {
    text-transform: capitalize;
  }

  font-size: 1.2rem;
  border-radius: 1rem;

  @media only screen and (max-width: 768px) {
    .card {
      margin: 0 auto;
    }
  }
`;

export const SpinnerStyled = styled.div`
  text-align: center;
  margin: 2rem;
`;

export const LikesStyled = styled.code`
  font-weight: bold;
`;
