import React, { useState, useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useInput } from '../../customHooks/useInput';
import { RadioInput } from './RadioInput';
import { tvSeries } from './tvSeries';

const SimpleInput = () => {
  const [durian, setDurian] = React.useState('');
  const durianIsValid = durian === 'yes' || durian === 'no';

  // const selectColorInputRef = useRef<HTMLButtonElement>(null);
  const [color, setColor] = useState('Colors of the Rainbow');
  const [colorIsTouched, setColorIsTouched] = useState(false);
  const colorIsValid = color !== 'Colors of the Rainbow';
  const colorHasError = !colorIsValid && colorIsTouched;

  const onColorChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setColor(event.target.value);
    setColorIsTouched(true);
  };

  const onColorBlurHandler = () => {
    setColorIsTouched(true);
  };

  // hasError: nicknameInputHasError <-- this is giving an alias; renaming hasError
  const {
    value: enteredNickname,
    isValid: enteredNicknameIsValid,
    hasError: nicknameInputHasError,
    onValueChangeHandler: nicknameChangeHandler,
    onValueBlurHandler: nicknameBlurHandler,
    reset: resetNicknameInput,
  } = useInput((value) => value.trim() !== '');
  const nicknameLengthBelow12 = enteredNickname.length <= 12;

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
  } = useInput((value) => value.includes('@'));

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
  const jokeNotTooLong = enteredJoke.length <= 100;

  const {
    value: enteredCountries,
    isValid: enteredCountriesIsValid,
    hasError: countriesInputHasError,
    onValueChangeHandler: countriesChangeHandler,
    onValueBlurHandler: countriesBlurHandler,
    reset: resetCountriesInput,
  } = useInput((value) => +value >= 1 && +value <= 195 && !value.includes('.'));

  // check validity for entire entire form
  let formIsValid = false;
  if (
    enteredNickname &&
    nicknameLengthBelow12 &&
    enteredEmail &&
    enteredRobotNumber &&
    enteredJoke &&
    jokeNotTooLong &&
    colorIsValid &&
    enteredCountries &&
    durianIsValid
  ) {
    formIsValid = true;
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (
      !enteredNicknameIsValid ||
      !nicknameLengthBelow12 ||
      !enteredEmailIsValid ||
      !enteredRobotNumberIsValid ||
      !enteredCokeIsValid ||
      !enteredJokeIsValid ||
      colorHasError ||
      !enteredCountriesIsValid
    ) {
      return;
    }
    // send to browser
    console.log({
      nickname: enteredNickname,
      robotNumber: enteredRobotNumber,
      email: enteredEmail,
      coke: enteredCoke,
      joke: enteredJoke,
      'favourite-color': color,
      countries: enteredCountries,
      durian,
    });

    resetNicknameInput();
    resetEmailInput();
    resetRobotNumberInput();
    resetCokeInput();
    resetJokeInput();
    setColor(''); // how to reset to original?
    // selectColorInputRef.current.select.clearValue();
    resetCountriesInput();
    setDurian('');
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <h2 className='mb-3'>Create A Robot</h2>
        <Form.Group className='mb-3'>
          <Form.Label>Give a robot nickname 🤖</Form.Label>
          <Form.Control
            type='text'
            placeholder='robocop'
            onChange={nicknameChangeHandler}
            onBlur={nicknameBlurHandler}
            value={enteredNickname}
          />
          {nicknameInputHasError && (
            <Form.Text className='text-muted'>
              Please enter a nickname
            </Form.Text>
          )}
          {!nicknameLengthBelow12 && (
            <Form.Text className='text-muted'>
              Nickname should be maximum 12 characters
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Choose a number between 1 and 1000 💯</Form.Label>
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
            <Form.Text className='text-muted'>
              Please enter a valid whole number below 1001
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Your email 💌</Form.Label>
          <Form.Control
            type='email'
            placeholder='robocop123@yahoo.com'
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <Form.Text className='text-muted'>
              Please enter a valid email
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>
            How much is a can of Coke 🥫 in your country? (convert to SGD$)
          </Form.Label>
          <Form.Control
            type='number'
            placeholder='1.20'
            onChange={cokeChangeHandler}
            onBlur={cokeBlurHandler}
            value={enteredCoke}
            min='0.1'
            max='30'
            step='0.1'
          />
          {cokeInputHasError && (
            <Form.Text className='text-muted'>
              Please enter a valid number
            </Form.Text>
          )}
          {cokeIsOverPriced && (
            <Form.Text className='text-muted'>
              <br />
              🥴 Does it cost THAT much?
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Tell me a joke! 🤣</Form.Label>
          <Form.Control
            type='text'
            placeholder='Knock knock!'
            onChange={jokeChangeHandler}
            onBlur={jokeBlurHandler}
            value={enteredJoke}
          />
          {jokeInputHasError && (
            <Form.Text className='text-muted'>Make me laugh</Form.Text>
          )}
          {!jokeNotTooLong && (
            <Form.Text className='text-muted'>
              Shorter joke below 100 characters please
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Pick your favourite color 🌈</Form.Label>
          <Form.Select
            onChange={onColorChangeHandler}
            onBlur={onColorBlurHandler}
            // ref={selectColorInputRef}
          >
            <option>Colors of the Rainbow</option>
            <option value='red'>Red</option>
            <option value='orange'>Orange</option>
            <option value='yellow'>Yellow</option>
            <option value='green'>Green</option>
            <option value='blue'>Blue</option>
            <option value='indigo'>Indigo</option>
            <option value='violet'>Violet</option>
          </Form.Select>
          {colorHasError && (
            <Form.Text className='text-muted'>Choose a color</Form.Text>
          )}
        </Form.Group>
        {/* <Form.Group className='mb-3'> */}
        {/* <Form.Label>Pick some favourite TV series 📺</Form.Label> */}
        {/* <ul>
            {tvSeries.map(({ series }, index) => {
              return (
                <li key={index}>
                  <div className='toppings-list-item'>
                    <div className='left-section'>
                      <input
                        type='checkbox'
                        id={`custom-checkbox-${index}`}
                        name={series}
                        value={series}
                        checked={tvSeriesChecked[index]}
                        onChange={() => onTvSeriesChange(series)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>
                        {series}
                      </label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul> */}

        {/* {['checkbox'].map((type: any) => (
            <div key={`inline-${type}`} className='mb-3'>
              <Form.Check
                inline
                label='Party pooper'
                value='party pooper'
                name='group1'
                type={type}
                id={`inline-${type}-1`}
                checked
              />
              <Form.Check
                inline
                label='2'
                value='2'
                name='group1'
                type={type}
                id={`inline-${type}-2`}
              />
              <Form.Check
                inline
                label='3'
                value='3'
                name='group1'
                type={type}
                id={`inline-${type}-2`}
              />
            </div>
          ))}
        </Form.Group> */}

        <Form.Group className='mb-3'>
          <Form.Label>How many countries have you visited? 🇱🇰</Form.Label>
          <Form.Control
            type='number'
            placeholder='1'
            onChange={countriesChangeHandler}
            onBlur={countriesBlurHandler}
            value={enteredCountries}
            min='1'
            max='195'
            step='1'
          />
          {countriesInputHasError && (
            <Form.Text className='text-muted'>
              There are 195 countries in the world
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Do you agree durians smell good? 💚</Form.Label>
          <br />
          <RadioInput
            inline
            label='Yes'
            value='yes'
            checked={durian}
            setter={setDurian}
          />
          <RadioInput
            inline
            label='No'
            value='no'
            checked={durian}
            setter={setDurian}
          />
        </Form.Group>
        <Button variant='warning' type='submit' disabled={!formIsValid}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SimpleInput;
