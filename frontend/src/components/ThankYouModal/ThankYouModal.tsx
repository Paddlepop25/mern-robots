import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { capitalizedFirstLetterOfEveryWord } from '../Utils/Utils';

export const ThankYouModal = (props: {
  title: string;
  showModal: any;
  handleCloseModal: React.MouseEventHandler<HTMLButtonElement>;
  nickname: string;
  handleSeeAdage: React.MouseEventHandler<HTMLButtonElement>;
  handleSeeUpdatedRobot: React.MouseEventHandler<HTMLButtonElement>;
  handleSeeRobots: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>What would you like to view now?</Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={props.handleSeeAdage}>
          Adage 🍀
        </Button>
        <Button variant='warning' onClick={props.handleSeeUpdatedRobot}>
          <b>{capitalizedFirstLetterOfEveryWord(props.nickname)}</b> robot 🤖
        </Button>
        <Button variant='success' onClick={props.handleSeeRobots}>
          See all robots 👆
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
