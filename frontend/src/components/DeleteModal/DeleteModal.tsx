import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { capitalizedFirstLetterOfEveryWord } from '../Utils/Utils';

export const DeleteModal = (props: {
  showModal: any;
  handleCloseModal: React.MouseEventHandler<HTMLButtonElement>;
  nickname: string;
  confirmDeleteRobot: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete robot? 🤖</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {capitalizedFirstLetterOfEveryWord(props.nickname)} will be sad 😿
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleCloseModal}>
          I changed my mind
        </Button>
        <Button variant='danger' onClick={props.confirmDeleteRobot}>
          I know what I'm doing
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
