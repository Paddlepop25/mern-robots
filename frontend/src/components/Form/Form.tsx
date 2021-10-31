import React from 'react';
import { Title } from './Form.styles';

const Form: React.FC = () => {
  return (
    <form>
      <Title>Tell me</Title>
      <label htmlFor='nickname'>
        Give a funny nickname:
        <input type='text' placeholder='e.g Bugs Bunny' />
      </label>
      <label htmlFor='email'>
        Email:
        <input type='email' placeholder='e.g whatsupdoc123@gmail.com' />
      </label>
      <label htmlFor='color'>
        What is your favourite color?
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
      <label>
        <input type='radio' value='yes' />
        Yes
      </label>
      <label>
        <input type='radio' value='no' />
        No
      </label>
      <label htmlFor='likes'>
        Click to upvote this entry
        <button>Like</button>
      </label>
    </form>
  );
};

export default Form;
