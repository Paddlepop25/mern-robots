import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LikesStyled, RobotsStyled } from './Robots.styles';

export interface RobotType {
  coke: number;
  countries: number;
  durians: true;
  email: string;
  'favourite-color': string;
  'favourite-series': string[];
  joke: string;
  likes: number;
  nickname: string;
  robot: string;
  timestamp: string;
  _id: string;
}

const Favourites: React.FC = (): React.ReactElement => {
  const [robots, setRobots] = useState<RobotType[]>([]);

  useEffect(() => {
    const getRobots = async () => {
      const results = await fetch('/my-favourites');
      const response = await results.json();
      setRobots(response);
    };
    getRobots();
  }, []);

  const upVoteHandler = async (nickname: string) => {
    const result = await fetch(`/my-favourites/${nickname}/likes`, {
      method: 'POST',
    });
    const body = await result.json();
    setRobots(body);
  };

  return (
    <RobotsStyled>
      <Container>
        {!robots && <p>LOADING ....</p>}
        <Row>
          {robots &&
            robots.map((robot) => (
              <Col xs={12} md={4} lg={3} key={robot._id}>
                <Card style={{ width: '18rem', background: '#ffcce6' }}>
                  <Card.Img variant='top' src={robot.robot} />
                  <Card.Body>
                    <Link to={`/my-favourites/${robot.nickname}`}>
                      <Button variant='info' className='capitalize mx-1 mb-2'>
                        {robot.nickname}
                      </Button>
                    </Link>
                    <Button
                      variant='primary'
                      className='mx-1 mb-2'
                      onClick={() => upVoteHandler(robot.nickname)}
                    >
                      Like 👍
                    </Button>
                    <br />
                    <span>
                      Likes : <LikesStyled>{robot.likes}</LikesStyled>
                    </span>
                  </Card.Body>
                </Card>
                <br />
              </Col>
            ))}
        </Row>
      </Container>
    </RobotsStyled>
  );
};

export default Favourites;
