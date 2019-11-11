import React from 'react';
import {
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const UpdateUserForm = (props) => {

  const firstName = props.user == null ? "" : props.user.namefirst;
  const lastName = props.user == null ? "" : props.user.namelast;
  const email = props.user == null ? "" : props.user.email;

  const handleSubmit = event => {
    console.log('handleSubmit');
    const form = event.currentTarget;
    const firstName = form.elements.firstname.value;
    const lastName = form.elements.lastname.value;
    const email = form.elements.email.value;
    event.preventDefault();
    event.stopPropagation();
    updateUser(firstName, lastName, email, props.user.userid);
  };

  const handleClose = props.close;

  const updateUser = (firstName, lastName, email, id) => {
    console.log('firstName: ' + firstName);
    console.log('lastName: ' + lastName);
    console.log('email: ' + email);
    console.log('id: ' + id);

    const url = 'http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users/' + id + '.json';

    const body = {
      'email': email,
      'namefirst': firstName,
      'namelast': lastName,
    };

    const config = {
      "headers": {
        "Authorization": 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM=',
      }
    };
    axios.put(url, body, config)
      .then(response => {
        console.log(response);
        handleClose();
      })
      .catch(error => {
        console.log('error fetching and parsing data', error);
      })
  }
  
  return ( 
    <Modal show={props.user != null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstname" defaultValue={firstName} placeholder="Enter First Name" />
            </Form.Group>
            <Form.Group controlId="Name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastname" defaultValue={lastName} placeholder="Enter Last Name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email" defaultValue={email} placeholder="Enter Email" />
            </Form.Group>
            <Button variant="secondary" onClick={props.close}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save 
            </Button>
          </Form>
        </Modal.Body>
  
      </Modal>
  );
}




export default UpdateUserForm;
