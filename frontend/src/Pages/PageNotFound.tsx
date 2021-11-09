import React from 'react';
import { Container } from 'react-bootstrap';
import sadRobot from '../images/sad_robot.jpg';
import { PageNotFoundStyled, ImageStyled } from './PageNotFound.styles';

const PageNotFound = () => {
  return (
    <Container>
      <PageNotFoundStyled>
        <h3>Page not found</h3>
        <ImageStyled
          src={sadRobot}
          alt='sad robot dragging his heart on a string'
        />
      </PageNotFoundStyled>
    </Container>
  );
};

export default PageNotFound;
