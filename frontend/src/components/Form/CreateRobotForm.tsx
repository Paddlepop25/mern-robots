import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useInput } from '../../customHooks/useInput';
import { ButtonsStyled, FormStyled } from './CreateRobotForm.styles';
import { RadioInput } from './RadioInput';
import { TVSERIES } from './TvSeries.data';

// see README for link to Stack Overflow
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

const CreateRobotForm: React.FC = () => {
  const history = useHistory();
  const [durians, setDurians] = React.useState(true);
  const [color, setColor] = useState('Pick a Rainbow Color');
  const [colorIsTouched, setColorIsTouched] = useState(false);
  const [tvSeries, setTvSeries] = useState(tvSeriesState);
  const [tvSeriesError, setTvSeriesError] = useState(false);

  const colorIsValid = color !== 'Pick a Rainbow Color';
  const colorHasError = !colorIsValid && colorIsTouched;

  // select color
  const onColorChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setColor(event.target.value);
    setColorIsTouched(true);
  };

  const onColorBlurHandler = () => {
    setColorIsTouched(true);
  };

  // select tv series
  let tvSeriesArray: string[] = [];
  // !using Typescript Indexable types
  for (let key in tvSeries) {
    // !using Typescript Utility type
    //   // console.log(`${key}: ${tvSeriesIsChecked[key]}`);
    // for (const key of Object.keys(tvSeries)) {
    if (tvSeries[key] === true) {
      tvSeriesArray.push(key);
    }
  }

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

  // using custom React hook
  // hasError: nicknameInputHasError <-- this is giving an alias; renaming hasError
  const {
    value: enteredNickname,
    isValid: enteredNicknameIsValid,
    hasError: nicknameInputHasError,
    onValueChangeHandler: nicknameChangeHandler,
    onValueBlurHandler: nicknameBlurHandler,
    reset: resetNicknameInput,
  } = useInput((value) => value.trim() !== '');
  const nicknameLengthBelow10 = enteredNickname.length <= 10;

  const {
    value: enteredRobotNumber,
    isValid: enteredRobotNumberIsValid,
    hasError: robotNumberInputHasError,
    onValueChangeHandler: robotNumberChangeHandler,
    onValueBlurHandler: robotNumberBlurHandler,
    reset: resetRobotNumberInput,
  } = useInput(
    (value) => +value >= 1 && +value <= 1000 && !value.includes('.')
  );

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    onValueChangeHandler: emailChangeHandler,
    onValueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes('@') && value.includes('.'));

  const {
    value: enteredCoke,
    isValid: enteredCokeIsValid,
    hasError: cokeInputHasError,
    onValueChangeHandler: cokeChangeHandler,
    onValueBlurHandler: cokeBlurHandler,
    reset: resetCokeInput,
  } = useInput((value) => +value >= 0.1 && +value <= 30);
  const cokeIsOverPriced = +enteredCoke > 30;

  const {
    value: enteredJoke,
    isValid: enteredJokeIsValid,
    hasError: jokeInputHasError,
    onValueChangeHandler: jokeChangeHandler,
    onValueBlurHandler: jokeBlurHandler,
    reset: resetJokeInput,
  } = useInput((value) => value.trim() !== '');
  const jokeNotTooLong = enteredJoke.length <= 200;

  const {
    value: enteredCountries,
    isValid: enteredCountriesIsValid,
    hasError: countriesInputHasError,
    onValueChangeHandler: countriesChangeHandler,
    onValueBlurHandler: countriesBlurHandler,
    reset: resetCountriesInput,
  } = useInput((value) => +value >= 1 && +value <= 195 && !value.includes('.'));

  // check validity for entire form to display button
  let formIsValid = false;
  if (
    enteredNickname &&
    nicknameLengthBelow10 &&
    enteredEmail &&
    enteredRobotNumber &&
    enteredJoke &&
    jokeNotTooLong &&
    colorIsValid &&
    enteredCountries
  ) {
    formIsValid = true;
  }

  const resetForm = () => {
    resetNicknameInput();
    resetEmailInput();
    resetRobotNumberInput();
    onUncheckAllCheckBoxes();
    resetCokeInput();
    resetJokeInput();
    resetCountriesInput();
    setDurians(true);
  };

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

    if (
      !enteredNicknameIsValid ||
      !nicknameLengthBelow10 ||
      !enteredEmailIsValid ||
      !enteredRobotNumberIsValid ||
      !enteredCokeIsValid ||
      !enteredJokeIsValid ||
      colorHasError ||
      tvSeriesHasError ||
      !enteredCountriesIsValid
    ) {
      return;
    }

    // send to browser
    fetch('/robots/newrobot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: enteredNickname,
        email: enteredEmail,
        robotNumber: Number(enteredRobotNumber),
        'favourite-color': color,
        'favourite-series': tvSeriesArray,
        coke: enteredCoke,
        joke: enteredJoke,
        countries: Number(enteredCountries),
        durians,
      }),
    });

    resetForm();

    history.push('/robots');

    // disable for local mongoDB
    // sometimes will have flash
    window.location.reload();
  };

  return (
    <Container>
      <FormStyled>
        <Form onSubmit={onSubmitHandler}>
          <h3>Create A Robot</h3>
          <Form.Group className='mb-4'>
            <Form.Label>Give a robot nickname 🤖</Form.Label>
            <Form.Control
              type='text'
              placeholder='robocop'
              onChange={nicknameChangeHandler}
              onBlur={nicknameBlurHandler}
              value={enteredNickname}
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
            <Form.Label>Your email 💌</Form.Label>
            <Form.Control
              type='email'
              placeholder='robocop123@yahoo.com'
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            />
            {emailInputHasError && (
              <Form.Text className='text-danger'>
                Please enter a valid email
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Choose a number between 1 and 1000 🔢</Form.Label>
            <Form.Control
              type='number'
              placeholder='888'
              onChange={robotNumberChangeHandler}
              onBlur={robotNumberBlurHandler}
              value={enteredRobotNumber}
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
            <Form.Label>Pick your favourite color 🌈</Form.Label>
            <Form.Select
              onChange={onColorChangeHandler}
              onBlur={onColorBlurHandler}
            >
              <option>Pick a Rainbow Color</option>
              <option value='red'>Red</option>
              <option value='orange'>Orange</option>
              <option value='yellow'>Yellow</option>
              <option value='green'>Green</option>
              <option value='blue'>Blue</option>
              <option value='indigo'>Indigo</option>
              <option value='violet'>Violet</option>
            </Form.Select>
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
            <Form.Label>
              How much is a can of Coke 🥫 in your country?
            </Form.Label>
            <Form.Control
              type='number'
              placeholder='1.2'
              onChange={cokeChangeHandler}
              onBlur={cokeBlurHandler}
              value={enteredCoke}
              min='0.10'
              max='30'
              step='0.10'
            />
            {/* <Form.Range min='0.1' max='10' step='0.1' /> */}
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
              placeholder='Knock knock!'
              onChange={jokeChangeHandler}
              onBlur={jokeBlurHandler}
              value={enteredJoke}
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
            <Form.Label>How many countries have you visited?</Form.Label>
            <Form.Control
              type='number'
              placeholder='🇱🇰  🇸🇬  🇧🇳  🇮🇳  🇻🇳  🇺🇸  🇸🇪 '
              onChange={countriesChangeHandler}
              onBlur={countriesBlurHandler}
              value={enteredCountries}
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
          <ButtonsStyled>
            <Button
              variant='warning'
              type='submit'
              disabled={!formIsValid}
              className='mb-2'
            >
              Create Robot 🤖
            </Button>
            <Button
              variant='info'
              type='reset'
              className='mb-2'
              onClick={resetForm}
            >
              Reset Form 📃
            </Button>
          </ButtonsStyled>
        </Form>
      </FormStyled>
    </Container>
  );
};

export default CreateRobotForm;
