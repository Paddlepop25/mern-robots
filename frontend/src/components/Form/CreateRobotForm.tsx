import React from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import { Title } from './CreateRobotForm.styles';
import SimpleInput from './SimpleInput';

const CreateRobotForm: React.FC = () => {
  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    console.log(event.target);
  };
  return (
    <Container>
      <SimpleInput />
      {/* <form onSubmit={onSubmitHandler}>
        <Title>Build your robot</Title>
        <Row>
          <label htmlFor='nickname'>
            Give a robot nickname:
            <input type='text' placeholder='e.g Robocop' />
          </label>
        </Row>
        <Row>
          <label htmlFor='email'>
            Email:
            <input type='email' placeholder='e.g whatsupdoc123@gmail.com' />
          </label>
        </Row>
        <label htmlFor='color'>
          Favourite color?
          <input type='text' placeholder='e.g PinkSalmon' />
        </label>
        <label htmlFor='series1'>
          Pick 3 of your favourite TV series
          <input type='text' placeholder='e.g Silicon Valley' />
          <input type='text' placeholder='e.g Home Improvement' />
          <input type='text' placeholder='e.g 3rd Rock From the Sun' />
        </label>
        <label htmlFor='coke'>
          What is the price of Coke in your country?
          <input type='number' min='0.1' step='0.1' placeholder='1.50' />
        </label>
        <label htmlFor='joke'>
          Tell me a joke 😆
          <textarea placeholder='' />
        </label>
        <label htmlFor='countries'>
          How many countries have you visited? 🇧🇳 🇸🇬 🇲🇾 🇱🇰 🇴🇲 🇨🇦
          <input type='number' min='1' max='195' step='1' placeholder='3' />
        </label>
        <p>Durian is the KING 👑 of fruits! Do you agree?</p>
        <label htmlFor='durians'>Give a number from 1 to 1000</label>
        <select name='durians' id='durians'>
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
        </select>

        <label>
          <input type='radio' value='yes' />
          Yes
        </label>
        <label>
          <input type='radio' value='no' />
          No
        </label>

        <label htmlFor='robot-url'>Give a number from 1 to 1000</label>
        <input
          type='number'
          name='robot-url'
          id='robot-url'
          min='1'
          max='1000'
        />

        <button>Submit robot</button>
      </form> */}
    </Container>
  );
};

export default CreateRobotForm;
