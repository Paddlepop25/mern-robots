import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useInput } from '../../customHooks/useInput';

const SimpleInput = () => {
  // hasError: nameInputHasError <-- this is giving an alias; renaming hasError
  const {
    value: enteredNickname,
    isValid: enteredNicknameIsValid,
    hasError: nameInputHasError,
    onValueChangeHandler: nameChangeHandler,
    onValueBlurHandler: nameBlurHandler,
    resetForm,
  } = useInput((value) => value.trim() !== '');
  const nicknameLengthBelow12 = enteredNickname.length <= 12;

  let formIsValid = false;

  if (enteredNickname && nicknameLengthBelow12) {
    formIsValid = true;
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!enteredNicknameIsValid || !nicknameLengthBelow12) {
      return;
    }
    // send to browser
    console.log({ nickname: enteredNickname });
    resetForm();
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label>Give a robot nickname</Form.Label>
          <Form.Control
            type='text'
            placeholder='e.g robocop'
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredNickname}
          />
          {nameInputHasError && (
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
        <Button variant='warning' type='submit' disabled={!formIsValid}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SimpleInput;
