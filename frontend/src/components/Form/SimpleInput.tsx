import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
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
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    onValueChangeHandler: emailChangeHandler,
    onValueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes('@'));

  // check validity for entire entire form
  let formIsValid = false;
  if (enteredNickname && nicknameLengthBelow12 && enteredEmail) {
    formIsValid = true;
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (
      !enteredNicknameIsValid ||
      !nicknameLengthBelow12 ||
      !enteredEmailIsValid
    ) {
      return;
    }
    // send to browser
    console.log({ nickname: enteredNickname, email: enteredEmail });

    resetNicknameInput();
    resetEmailInput();
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label>Give a robot nickname</Form.Label>
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
          <Form.Label>Your email</Form.Label>
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
        <Button variant='warning' type='submit' disabled={!formIsValid}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SimpleInput;
