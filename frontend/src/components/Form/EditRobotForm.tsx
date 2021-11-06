import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useInput } from '../../customHooks/useInput';
import { RobotType } from '../../Pages/Robots';
import { NickNameType } from '../RobotDetails/RobotDetails';
import { capitalizedFirstLetterOfEveryWord } from '../Utils/Utils';
import { FormStyled } from './CreateRobotForm.styles';
import { GoBackButtonStyled } from './EditRobotForm.styles';
import { RadioInput } from './RadioInput';
import { TVSERIES } from './TvSeries.data';

// stackoverflow.com/questions/57667198/typescript-error-type-string-cant-be-used-to-index-type-x/57667278#57667278
// !Typescript Indexable Type
const tvSeriesState: { [key: string]: boolean } = {
  // !Typescript Utility Type
  // const tvSeriesIsChecked: Record<string, boolean> = {
  FullHouse: false,
  Moana: false,
  Superman: false,
  Wolfgang: false,
  'Zack & Cody': false,
  'Squid Game': false,
  Scream: false,
  '3rd Rock From the Sun': false,
  Batman: false,
  'Silicon Valley': false,
  Cars: false,
  Lucifer: false,
};

// coke: "4.2"
// countries: "23"
// durians: false
// email: "pumpkincoach123@gmail.com"
// favourite-color: "Yellow"
// favourite-series: (2) ['Moana', 'Cars']
// joke: "What drink did the Node developer had? Expresso."
// likes: 0
// nickname: "cinderella"
// robotNumber: "4"
// robotUrl: "https://robohash.org/4"
// timestamp: "2021-11-05T13:06:06.665Z"
// _id: "61852c3ebac98bd061c02c17"

const EditRobotForm: React.FC = () => {
  const history = useHistory();

  const [mongoDbRobot, setMongoDbRobot] = useState<RobotType>();
  const [nickname, setNickname] = useState('');
  const [robotNumber, setRobotNumber] = useState('');
  const [email, setEmail] = useState('');
  const [coke, setCoke] = useState('');
  const [joke, setJoke] = useState('');
  const [color, setColor] = useState('');
  const [tvSeriesFromMongoDb, setTvSeriesFromMongoDb] = useState([]);
  const [tvSeries, setTvSeries] = useState(tvSeriesState);
  const [tvSeriesError, setTvSeriesError] = useState(false);
  const [countries, setCountries] = useState('');
  const [durians, setDurians] = useState(true);

  const getSpecificRobot = useParams<NickNameType>();
  const robotNickname = getSpecificRobot['nickname'];

  useEffect(() => {
    const getRobot = async () => {
      const result = await fetch(`/robots/${robotNickname}`);
      const robot = await result.json();
      setMongoDbRobot(robot);
      setNickname(robot.nickname);
      setRobotNumber(robot.robotNumber);
      setEmail(robot.email);
      setCoke(robot.coke);
      setJoke(robot.joke);
      setColor(robot['favourite-color']);
      setTvSeriesFromMongoDb(robot['favourite-series']);
      setCountries(robot.countries);
      setDurians(robot.durians);
    };
    getRobot();
    console.clear();
  }, []);

  useEffect(() => {
    const populateCheckBoxes = async () => {
      tvSeriesFromMongoDb.forEach((seriesFromDb) => {
        Object.keys(tvSeriesState).forEach((series) => {
          if (seriesFromDb === series) {
            setTvSeries((prevState) => ({
              ...prevState,
              [series]: true,
            }));
          }
        });
      });
    };
    populateCheckBoxes();
  }, [tvSeriesFromMongoDb]);

  const nicknameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNickname(event.target.value);
  };
  const nicknameInputIsValid = nickname.trim() !== '';
  const nicknameInputHasError = !nicknameInputIsValid;
  const nicknameLengthBelow10 = nickname.length <= 10;

  const robotNumberChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRobotNumber(event.target.value);
  };
  const robotNumberIsValid =
    +robotNumber >= 1 && +robotNumber <= 1000 && !robotNumber.includes('.');
  const robotNumberInputHasError = !robotNumberIsValid;

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const emailIsValid = email.includes('@');
  const emailInputHasError = !emailIsValid;

  const cokeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoke(event.target.value);
  };
  const cokeIsValid = +coke > 0 && +coke <= 30;
  const cokeInputHasError = coke === '' || !cokeIsValid;
  const cokeIsOverPriced = +coke > 30;

  const jokeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoke(event.target.value);
  };
  const jokeInputHasError = joke.trim() === '';
  const jokeNotTooLong = joke.length <= 200;

  const onColorChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setColor(event.target.value);
  };
  const colorIsValid = color !== 'Colors of the Rainbow';
  const colorHasError = !colorIsValid;

  // TV series
  const onCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const series = event.target.name;
    setTvSeries((prevState) => ({
      ...prevState,
      [series]: !prevState[series],
    }));
    setTvSeriesError(false);
  };

  const selectAllCheckBoxes = (checked: boolean): void => {
    Object.keys(tvSeriesState).forEach((series) => {
      setTvSeries((prevState) => ({
        ...prevState,
        [series]: checked,
      }));
    });
  };
  const onCheckAllCheckBoxes = () => {
    selectAllCheckBoxes(true);
    setTvSeriesError(false);
  };

  const onUncheckAllCheckBoxes = () => selectAllCheckBoxes(false);
  const checkedTvSeries = Object.fromEntries(
    Object.entries(tvSeries).filter(([series, checked]) => checked === true)
  );
  const tvSeriesMinimumOneChecked = Object.keys(checkedTvSeries).length > 0;

  const countriesChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCountries(event.target.value);
  };
  const countriesIsValid =
    +countries >= 1 && +countries <= 195 && !countries.includes('.');
  const countriesInputHasError = countries === '' || !countriesIsValid;

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    let tvSeriesHasError = false;
    // IIFE - immediately invoked function expression
    (function () {
      if (!tvSeriesMinimumOneChecked) {
        setTvSeriesError(true);
        tvSeriesHasError = true;
      }
    })();

    let tvSeriesArray = [];
    for (let key in tvSeries) {
      if (tvSeries[key] === true) {
        tvSeriesArray.push(key);
      }
    }

    // const duriansBoolean = durians === 'yes' ? true : false;
    // send to browser
    const editedRobot = {
      nickname,
      robotNumber,
      email,
      coke,
      joke,
      'favourite-color': color,
      'favourite-series': tvSeriesArray,
      countries,
      durians,
    };
    console.clear();
    console.log(editedRobot);

    // fetch('/robots/newrobot', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     nickname: enteredNickname,
    //     robotNumber: enteredRobotNumber,
    //     email: enteredEmail,
    //     coke: enteredCoke,
    //     joke: enteredJoke,
    //     'favourite-color': color,
    //     'favourite-series': tvSeriesArray,
    //     countries: enteredCountries,
    //     durians,
    //   }),
    // });

    // reset
    setNickname('');
    setRobotNumber('');
    setEmail('');
    setCoke('');
    setJoke('');
    setColor('');
    setCountries('');
    // setDurians()
    history.goBack();
  };

  return (
    <Container>
      {mongoDbRobot && (
        <FormStyled>
          <Form onSubmit={onSubmitHandler}>
            <h3>Edit This Robot</h3>
            <Form.Group className='mb-4'>
              <Form.Label>Give a robot nickname 🤖</Form.Label>
              <Form.Control
                type='text'
                onChange={nicknameChangeHandler}
                // value={capitalizedFirstLetterOfEveryWord(nickname)}
                value={capitalizedFirstLetterOfEveryWord(nickname)}
              />
              {nicknameInputHasError && (
                <Form.Text className='text-danger'>
                  Please enter a nickname
                </Form.Text>
              )}
              {!nicknameLengthBelow10 && (
                <Form.Text className='text-danger'>
                  Nickname should be maximum 10 characters
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Choose a number between 1 and 1000 💯</Form.Label>
              <Form.Control
                type='number'
                onChange={robotNumberChangeHandler}
                value={robotNumber}
                min='1'
                max='1000'
                step='1'
              />
              {robotNumberInputHasError && (
                <Form.Text className='text-danger'>
                  Please enter a valid whole number below 1001
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Your email 💌</Form.Label>
              <Form.Control
                type='email'
                onChange={emailChangeHandler}
                value={email}
              />
              {emailInputHasError && (
                <Form.Text className='text-danger'>
                  Please enter a valid email
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>
                How much is a can of Coke 🥫 in your country?
              </Form.Label>
              <Form.Control
                type='number'
                onChange={cokeChangeHandler}
                value={coke}
                min='0.1'
                max='30'
                step='0.1'
              />
              {cokeInputHasError && (
                <Form.Text className='text-danger'>
                  Please enter a valid number
                </Form.Text>
              )}
              {cokeIsOverPriced && (
                <Form.Text className='text-danger'>
                  <br />
                  🥴 Does it cost THAT much?
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Tell me a joke! 🤣</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                type='text'
                onChange={jokeChangeHandler}
                value={joke}
              />
              {jokeInputHasError && (
                <Form.Text className='text-danger'>Make me laugh</Form.Text>
              )}
              {!jokeNotTooLong && (
                <Form.Text className='text-danger'>
                  Shorter joke below 200 characters please
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Pick your favourite color 🌈</Form.Label>
              <Form.Select onChange={onColorChangeHandler}>
                <option>Colors of the Rainbow</option>
                <option value='red'>Red</option>
                <option value='orange'>Orange</option>
                <option value='yellow'>Yellow</option>
                <option value='green'>Green</option>
                <option value='blue'>Blue</option>
                <option value='indigo'>Indigo</option>
                <option value='violet'>Violet</option>
              </Form.Select>
              <Form.Text className='text-danger'>
                Was '{mongoDbRobot['favourite-color']}'. Do you want to pick
                another one?
              </Form.Text>
              {colorHasError && (
                <Form.Text className='text-danger'>Choose a color</Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Pick some favourite TV series 📺</Form.Label>
              {TVSERIES.map((series, index) => {
                return (
                  <div key={index}>
                    <Form.Check.Label>
                      <Form.Check
                        inline
                        type='checkbox'
                        name={series}
                        checked={tvSeries[series]}
                        onChange={onCheckBoxChange}
                      />
                      {series}
                    </Form.Check.Label>
                  </div>
                );
              })}
              <Button
                variant='info'
                type='button'
                size='sm'
                className='mt-2'
                onClick={onCheckAllCheckBoxes}
              >
                Select All
              </Button>
              <Button
                variant='primary'
                type='button'
                size='sm'
                className='mt-2 mx-2'
                onClick={onUncheckAllCheckBoxes}
              >
                Deselect All
              </Button>
              <br />
              {tvSeriesError && (
                <Form.Text className='text-danger'>
                  C'mon, choose at least 1 TV Programme
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>How many countries have you visited?</Form.Label>
              <Form.Control
                type='number'
                onChange={countriesChangeHandler}
                value={countries}
                min='1'
                max='195'
                step='1'
              />
              {countriesInputHasError && (
                <Form.Text className='text-danger'>
                  There are 195 countries in the world
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Do you agree durians smell good? 💚</Form.Label>
              <br />
              <Form.Check.Label>
                <RadioInput
                  inline
                  label='Yes!'
                  value={true}
                  checked={durians}
                  setter={setDurians}
                />
              </Form.Check.Label>
              <Form.Check.Label>
                <RadioInput
                  inline
                  label='Eww...'
                  value={false}
                  checked={durians}
                  setter={setDurians}
                />
              </Form.Check.Label>
            </Form.Group>
            <Button variant='warning' type='submit' className='mb-2 mx-2'>
              Save Robot 🤖
            </Button>
            <Button variant='info' type='button' className='mb-2'>
              <GoBackButtonStyled>
                <Link to='/robots'>Go back ⬅️</Link>
              </GoBackButtonStyled>
            </Button>
          </Form>
        </FormStyled>
      )}
    </Container>
  );
};

export default EditRobotForm;
