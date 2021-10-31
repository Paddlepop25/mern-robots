import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { RobotType } from '../../Pages/Robots';
import { RobotDetailsStyled } from './RobotDetails.styles';

interface NickNameType {
  nickname: string;
}

const RobotDetails: React.FC = () => {
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

  console.log(robot);

  return (
    <>
      {robot && (
        <RobotDetailsStyled>
          <Container>
            <Row>
              <Col xs={12} md={4}>
                <img
                  src={robot.robot}
                  alt={`details of robot ${robot.nickname}`}
                />
              </Col>
              <Col xs={12} md={8}>
                <p className='capitalize'>
                  Nickname 🤖 : <code>{robot.nickname}</code>
                </p>
                <p>
                  Email 💌 : <code>{robot.email}</code>
                </p>
                <p>
                  Favourite color 💥 : <code>{robot['favourite-color']}</code>
                </p>
                <p>
                  Favourite series 📺 :{' '}
                  <code>{robot['favourite-series'].join(', ')}</code>
                </p>
                <p>
                  Price of a can of Coke in your country 🥫 :{' '}
                  <code>SGD&#36;{robot.coke}0</code>
                </p>
                <p>
                  Tell me a joke 🤣 : <code>{robot.joke}</code>
                </p>
                <p>
                  How many countries have you visited 🇧🇳 🇸🇬 🇱🇰 🇺🇸 🇴🇲 :{' '}
                  <code>{robot.countries}</code>
                </p>
                <p>
                  Durian smells good 💚 :{' '}
                  <code>{robot.durians ? 'Yes!' : 'No!'}</code>
                </p>
              </Col>
            </Row>
          </Container>
        </RobotDetailsStyled>
      )}
    </>
  );
};

export default RobotDetails;
