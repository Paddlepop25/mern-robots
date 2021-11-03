import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const SimpleInput = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameIsTouched, setNicknameIsTouched] = useState(false);

  const trimmedNickname = nickname.trim();
  const nicknameIsNotEmpty = trimmedNickname !== '';
  const nicknameLengthBelow12 = trimmedNickname.length <= 12;
  const invalidNickname = !nicknameIsNotEmpty && nicknameIsTouched;

  let formIsValid = false;
  if (nicknameIsNotEmpty && nicknameLengthBelow12) {
    formIsValid = true;
  }

  const onInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNickname(event.target.value);
  };

  const onInputBlurHandler = () => {
    setNicknameIsTouched(true);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setNicknameIsTouched(true);

    if (!nicknameIsNotEmpty || !nicknameLengthBelow12) {
      return;
    }
    // send to browser
    console.log({ nickname });

    setNickname('');
    setNicknameIsTouched(false);
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label>Give a robot nickname</Form.Label>
          <Form.Control
            type='text'
            placeholder='e.g robocop'
            onChange={onInputChangeHandler}
            onBlur={onInputBlurHandler}
            value={nickname}
          />
          {invalidNickname && (
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
      {/* {} */}
      {/* <form onSubmit={onSubmitHandler}>
        <label htmlFor='nickname'>Nickname</label>
        <input
          type='text'
          id='nickname'
          placeholder='nickname'
          onChange={onInputChangeHandler}
          onBlur={onInputBlurHandler}
          value={nickname}
        />
        {invalidNickname && (
          <p style={{ color: 'red' }}>emptyStringError</p>
        )}
        {invalidNicknameLength && (
            <Form.Text className='text-muted'>
              Nickname should be maximum 12 characters
            </Form.Text>
          )}
        <Button variant='warning' type='submit'>
          Submit
        </Button>
      </form> */}
    </Container>
  );
};

export default SimpleInput;
