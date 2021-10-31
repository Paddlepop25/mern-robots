import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RobotsStyled } from './Robots.styles';

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

  return (
    <>
      <RobotsStyled>
        {!robots && <p>LOADING ....</p>}
        {robots &&
          robots.map((robot) => (
            <div key={robot._id}>
              <Card style={{ width: '18rem', background: '#ffcce6' }}>
                <Card.Img variant='top' src={robot.robot} />
                <Card.Body>
                  <Link to={`/my-favourites/${robot.nickname}`}>
                    <Button variant='info' className='capitalize'>
                      {robot.nickname}
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
              <br />
            </div>
          ))}
      </RobotsStyled>
    </>
  );
};

export default Favourites;
