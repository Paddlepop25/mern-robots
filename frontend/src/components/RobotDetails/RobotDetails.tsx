import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { RobotType } from '../../Pages/Robots';
import { RobotDetailsStyled } from './RobotDetails.styles';

interface NickNameType {
  nickname: string;
}

const RobotDetails: React.FC = () => {
  const history = useHistory();
  const getRobotParams = useParams<NickNameType>();
  const robotNickname = getRobotParams['nickname'];

  const [robot, setRobot] = useState<RobotType>();

  useEffect(() => {
    const getRobot = async () => {
      const results = await fetch(`/my-favourites/${robotNickname}`);
      const response = await results.json();
      setRobot(response);
    };
    getRobot();
  }, []);

  const onBackHandler = () => {
    history.push('/my-favourites');
  };

  const onEditHandler = () => {
    console.log('edit');
  };

  const onDeleteHandler = () => {
    console.log('delete');
  };

  return (
    <>
      {robot && (
        <RobotDetailsStyled>
          <Container>
            <Row>
              <Col xs={12} md={6} lg={4}>
                <img
                  src={robot.robot}
                  alt={`details of robot ${robot.nickname}`}
                />
              </Col>
              <Col xs={12} md={6} lg={8}>
                <p className='capitalize mt-3'>
                  🤖 Nickname : <code>{robot.nickname}</code>
                </p>
                <p>
                  💌 Email : <code>{robot.email}</code>
                </p>
                <p>
                  💥 Favourite color : <code>{robot['favourite-color']}</code>
                </p>
                <p>
                  📺 Favourite series :{' '}
                  <code>{robot['favourite-series'].join(', ')}</code>
                </p>
                <p>
                  🥫 Price of a can of Coke in your country :{' '}
                  <code>SGD&#36;{robot.coke}0</code>
                </p>
                <p>
                  🤣 Tell me a joke : <code>{robot.joke}</code>
                </p>
                <p>
                  🇱🇰 How many countries have you visited :{' '}
                  <code>{robot.countries}</code>
                </p>
                <p>
                  💚 Durian smells good :{' '}
                  <code>{robot.durians ? 'Yes!' : 'No!'}</code>
                </p>
                <p>
                  👍 Likes : <code>{robot.likes}</code>
                </p>
                <Button
                  variant='warning'
                  className='px-4'
                  onClick={onBackHandler}
                >
                  Back
                </Button>
                <Button
                  variant='outline-dark'
                  className='px-4 mx-3 '
                  onClick={onEditHandler}
                >
                  Edit
                </Button>
                <Button variant='outline-danger' onClick={onDeleteHandler}>
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </RobotDetailsStyled>
      )}
    </>
  );
};

export default RobotDetails;
