import React from 'react';
import {
  Button,
  Container,
  Form,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { useInput } from '../../customHooks/useInput';

const SimpleInput = () => {
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
  } = useInput((value) => value >= 1 && value <= 1000);

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

  const colorChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };
  // check validity for entire entire form
  let formIsValid = false;
  if (
    enteredNickname &&
    nicknameLengthBelow12 &&
    enteredEmail &&
    enteredRobotNumber &&
    enteredJoke &&
    jokeNotTooLong
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
      !enteredJokeIsValid
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
    });

    resetNicknameInput();
    resetEmailInput();
    resetRobotNumberInput();
    resetCokeInput();
    resetJokeInput();
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
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
              Please enter a valid number
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
            <Form.Text className='text-muted'>Shorter joke please</Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Pick your favourite color</Form.Label>
          {/* <Form.Control
            type='text'
            placeholder='robocop'
            onChange={nicknameChangeHandler}
            onBlur={nicknameBlurHandler}
            value={enteredNickname}
          /> */}
          <Form.Select onChange={colorChangeHandler}>
            <option>Colors 🌈</option>
            <option value='red'>Red</option>
            <option value='orange'>Orange</option>
            <option value='yellow'>Yellow</option>
            <option value='green'>Green</option>
            <option value='blue'>Blue</option>
            <option value='indigo'>Indigo</option>
            <option value='violet'>Violet</option>
          </Form.Select>
        </Form.Group>
        <Button variant='warning' type='submit' disabled={!formIsValid}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SimpleInput;
