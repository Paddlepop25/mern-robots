import React from 'react';
import { Container } from 'react-bootstrap';
import { HomePageStyled, CodeStyled } from './HomePage.styles';

const HomePage = () => {
  return (
    <Container>
      <HomePageStyled>
        <h3>Robots 🤖</h3>
        <CodeStyled>
          is an application that allows the user to create one with it's own
          personality, view all created robots and see some adages. The given
          number 🔢 between 1 to 1000 will determine how the robot look like.
          <br />
          <br />
          Each robot could also be given likes and it's personality changed via
          the edit form. Want to destroy a robot? No problem, just click on the
          delete ❌ button.
          <br />
          <br />
          Upcoming features include a game and user log in for a personalised
          touch.
          <br />
          <br />
          Perhaps the robots would have different power 💪 and could even trade
          NFTs 💰.
          <br />
          <br />
          This application is 🛠️ work in progress. If you have any suggestion
          and comments, please contact 💌 me via one of the social media sites
          listed in the footer below.
          <br />
          <br />
          Robots 🤖 is proudly created using the 👩🏻‍💻 MERN (MongoDB, Express,
          React, Node) stack and hosted on Heroku.
        </CodeStyled>
      </HomePageStyled>
    </Container>
  );
};

export default HomePage;
