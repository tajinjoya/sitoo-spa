import React from 'react';
import {
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUserForm = (props) => {
  const handleSubmit = event => {
    console.log('handleSubmit');
    const form = event.currentTarget;
    const firstName = form.elements.firstname.value;
    const lastName = form.elements.lastname.value;
    const email = form.elements.email.value;
    event.preventDefault();
    event.stopPropagation();
    addUser(firstName, lastName, email);
  };

  const notifySuccess = (text) => {
    toast.success(text);
  }

  const notifyError = (text) => {
    toast.error(text);
  }

  const handleClose = props.close;

  const addUser = (firstName, lastName, email) => {
    console.log('firstName: ' + firstName);
    console.log('lastName: ' + lastName);
    console.log('email: ' + email);

    const url = 'http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json';

    const body = {
      'email': email,
      'namefirst': firstName,
      'namelast': lastName,
    };

    const config = {
      "headers": {
        "Authorization": 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM='
      }
    };
    axios.post(url, body, config)
      .then(response => {
        console.log(response);
        notifySuccess('User added');
        setTimeout(() => {
          handleClose();
        }, 3000);
      })
      .catch(error => {
        console.log('error fetching and parsing data', error);
        const errorCode = error.response.status;
        let message = errorCode !== 400 ? 'Error in adding user' : 
        'Bad Request. Invalid syntax, missing required argument or invalid request.';
        notifyError(message);
      });
  }


  return ( 
    <Modal show={props.show} onHide={handleClose} className="col-8">
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstname" placeholder="Enter First Name" />
            </Form.Group>
            <Form.Group controlId="Name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastname" placeholder="Enter Last Name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email" placeholder="Enter Email" />
            </Form.Group>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
            <Button className="button" variant="secondary" onClick={props.close}>
              Cancel
            </Button>
            <Button className="button" variant="primary" type="submit">
              Save 
            </Button>
          </Form>
        </Modal.Body>
  
      </Modal>
  );
}




export default AddUserForm;
