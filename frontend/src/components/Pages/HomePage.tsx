import React from 'react';
import DidYouKnow from '../DidYouKnow/DidYouKnow';
import Entries from '../Entries/Entries';
import Form from '../Form/Form';

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <DidYouKnow />
      <Form />
      <Entries />
    </>
  );
};

export default HomePage;
