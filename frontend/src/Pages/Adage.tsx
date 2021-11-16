import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import {
  AdageStyled,
  AdageAnswerStyled,
  AdageQuoteStyled,
  CodeStyled,
  SpinnerStyled,
} from './Adage.styles';

const Adage: React.FC = () => {
  const [adage, setAdage] = useState('');
  const [adageQuestion, setAdageQuestion] = useState('');
  const [adageAnswer, setAdageAnswer] = useState('');
  const [adageQuote, setAdageQuote] = useState('');
  const [adageError, setAdageError] = useState('');

  const getRandomAdage = async () => {
    try {
      await fetch('https://isvbscriptdead.com/api/fortune/')
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
    } catch (error) {
      setAdageError('Error is fetching adage. Try again later.');
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getRandomAdage();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container>
      <AdageStyled>
        <h3>Robot Adage</h3>
        <CodeStyled>/ˈrəʊbɒt adɪdʒ/</CodeStyled>
        <p>
          A proverb or short statement expressing a general truth, applicable to
          all robots 🤖
        </p>
        <br />
        <Button
          variant='info'
          className='capitalize mx-1'
          onClick={getRandomAdage}
        >
          Click for more 👇
        </Button>
        <br />
        <br />
        {adageError && <h4>{adageError}</h4>}
        {!adageError &&
          !adage &&
          !adageQuestion &&
          !adageAnswer &&
          !adageQuote && (
            <SpinnerStyled>
              <Spinner animation='border' variant='danger' />
            </SpinnerStyled>
          )}
        {adage && <h4>{adage}</h4>}
        {adageQuestion && <h4>{adageQuestion}</h4>}
        {adageAnswer && <AdageAnswerStyled>{adageAnswer}</AdageAnswerStyled>}
        {adageQuote && <AdageQuoteStyled>{adageQuote}</AdageQuoteStyled>}
      </AdageStyled>
    </Container>
  );
};

export default Adage;
