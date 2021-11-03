import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  AdageAnswerStyled,
  AdageQuoteStyled,
  CodeStyled,
  HomePageStyled,
  ParagraphStyled,
} from './HomePage.styles';

const HomePage: React.FC = () => {
  const [adage, setAdage] = useState('');
  const [adageQuestion, setAdageQuestion] = useState('');
  const [adageAnswer, setAdageAnswer] = useState('');
  const [adageQuote, setAdageQuote] = useState('');

  const getRandomAdage = () => {
    fetch('https://isvbscriptdead.com/api/fortune/')
      .then((response) => response.json())
      .then((result) => {
        if (result[0] === 'Q') {
          setAdage('');
          setAdageQuote('');
          let indexOfA = result.indexOf('A:');
          setAdageQuestion(result.substring(0, indexOfA));
          setAdageAnswer(result.substring(indexOfA));
        } else if (result.includes('-- ')) {
          setAdageQuestion('');
          setAdageAnswer('');
          let indexOfDashDash = result.indexOf('-- ');
          setAdage(result.substring(0, indexOfDashDash));
          setAdageQuote(result.substring(indexOfDashDash));
        } else {
          setAdageQuestion('');
          setAdageAnswer('');
          setAdageQuote('');
          setAdage(result);
        }
      });
  };

  useEffect(() => {
    getRandomAdage();
  }, []);
  return (
    <HomePageStyled>
      <h3>Robot Adage</h3>
      <CodeStyled>/ˈrəʊbɒt adɪdʒ/</CodeStyled>
      <ParagraphStyled>
        A proverb or short statement expressing a general truth, applicable to
        all robots 🤖
      </ParagraphStyled>
      <br />

      <Button
        variant='info'
        className='capitalize mx-1 mb-2'
        onClick={getRandomAdage}
      >
        Click for more 👇
      </Button>
      <br />
      <br />
      <h4>{adage}</h4>
      {adageQuestion && <h4>{adageQuestion}</h4>}
      {adageAnswer && <AdageAnswerStyled>{adageAnswer}</AdageAnswerStyled>}
      {adageQuote && <AdageQuoteStyled>{adageQuote}</AdageQuoteStyled>}
    </HomePageStyled>
  );
};

export default HomePage;
