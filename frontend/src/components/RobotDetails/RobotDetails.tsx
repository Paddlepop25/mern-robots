import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { RobotType } from '../../Pages/Robots';
import { SpinnerStyled } from '../../Pages/Robots.styles';
import DeleteModal from '../DeleteModal/DeleteModal';
import {
  capitalizedFirstLetter,
  capitalizedFirstLetterOfEveryWord,
  convertNewDateToDisplay,
  displaysTwoDecimalPlaces,
} from '../Utils/Utils';
import {
  ButtonsStyled,
  RobotCreateStyled,
  RobotDetailsStyled,
} from './RobotDetails.styles';
export interface NickNameType {
  nickname: string;
}

const RobotDetails = () => {
  const history = useHistory();
  const getRobotParams = useParams<NickNameType>();
  const robotNickname = getRobotParams['nickname'];

  const [robot, setRobot] = useState<RobotType>();
  const [statusCode200, setSetStatusCode200] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteSpinner, setShowDeleteSpinner] = React.useState(false);

  useEffect(() => {
    const getRobot = async () => {
      const results = await fetch(`/robots/${robotNickname}`);
      const response = await results.json();
      setRobot(response);
      setSetStatusCode200(true);
    };
    getRobot();
  }, [robotNickname]);

  const onBackHandler = () => {
    history.push('/robots');
  };

  const onEditHandler = () => {
    history.push(`/editform/${robotNickname}`);
  };

  const onDeleteHandler = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const confirmDeleteRobot = async () => {
    setShowDeleteSpinner(true);
    const response = await fetch(`/robots/${robotNickname}/delete`, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      history.push('/robots');
    }
  };

  return (
    <>
      {!statusCode200 && (
        <SpinnerStyled>
          <Spinner animation='border' variant='danger' />
        </SpinnerStyled>
      )}
      {robot && (
        <RobotDetailsStyled>
          <Container>
            <Row>
              <Col xs={12} md={6} lg={4}>
                <img
                  src={robot.robotUrl}
                  alt={`details of robot ${robot.nickname}`}
                />
                <br />
                <RobotCreateStyled>
                  <code>
                    Created on {convertNewDateToDisplay(robot.timestamp)}
                  </code>
                </RobotCreateStyled>
              </Col>
              <Col xs={12} md={6} lg={8}>
                <p className='capitalize mt-3'>
                  🤖 Nickname :{' '}
                  <code>
                    {capitalizedFirstLetterOfEveryWord(robot.nickname)}
                  </code>
                </p>
                <p>
                  💌 Email : <code>{robot.email}</code>
                </p>
                <p>
                  🔢 Favourite number : <code>{robot.robotNumber}</code>
                </p>
                <p>
                  🌈 Favourite color :{' '}
                  <code>
                    {capitalizedFirstLetter(robot['favourite-color'])}
                  </code>
                </p>
                <p>
                  📺 Favourite series :{' '}
                  <code>{robot['favourite-series'].join(', ')}</code>
                </p>
                <p>
                  🥫 Price of a can of Coke in your country :{' '}
                  <code>SGD&#36;{displaysTwoDecimalPlaces(robot.coke)}</code>
                </p>
                <p>
                  🤣 Joke : <code>{robot.joke}</code>
                </p>
                <p>
                  🇱🇰 Countries visited : <code>{robot.countries}</code>
                </p>
                <p>
                  💚 Durian smells good :{' '}
                  <code>{robot.durians ? 'Yes!' : 'Eww...'}</code>
                </p>
                <p>
                  👍 Likes : <code>{robot.likes}</code>
                </p>
                <ButtonsStyled>
                  <Button
                    variant='warning'
                    className='px-4 mt-1'
                    onClick={onBackHandler}
                  >
                    Back
                  </Button>
                  <Button
                    variant='outline-dark'
                    className='px-4 mx-3 mt-1'
                    onClick={onEditHandler}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='outline-danger'
                    className='mt-1'
                    onClick={onDeleteHandler}
                  >
                    Delete
                  </Button>
                </ButtonsStyled>
                <DeleteModal
                  showModal={showModal}
                  handleCloseModal={handleCloseModal}
                  nickname={robotNickname}
                  confirmDeleteRobot={confirmDeleteRobot}
                  showDeleteSpinner={showDeleteSpinner}
                />
              </Col>
            </Row>
          </Container>
        </RobotDetailsStyled>
      )}
    </>
  );
};

export default RobotDetails;
