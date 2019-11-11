import React from 'react';
import {
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const DeleteUsersForm = (props) => {

  const show = props.ids !== null && props.ids.length !== 0;

  const handleSubmit = event => {
    console.log('handleSubmit');
    event.preventDefault();
    event.stopPropagation();
    deleteUsers(props.ids);
  };

  const handleClose = props.close;

  const deleteUser = (id) => {
    console.log('Id to delete: ' + id);
    const url = 'http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users/' + id + '.json';

    const config = {
      "headers": {
        "Authorization": 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM='
      }
    };
    axios.delete(url, config)
      .then(response => {
        console.log(response);
        handleClose();
      })
      .catch(error => {
        console.log('error fetching and parsing data', error);
      });
  } 

  const deleteUsers = (ids) => {
    ids.forEach(id => {
      deleteUser(id);
    });
  }

  return ( 
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Selected Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Button variant="secondary" onClick={props.close}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm Deletion 
            </Button>
          </Form>
        </Modal.Body>
  
      </Modal>
  );
}




export default DeleteUsersForm;
