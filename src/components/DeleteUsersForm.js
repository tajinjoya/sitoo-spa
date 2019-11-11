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

const DeleteUsersForm = (props) => {

  const show = props.users !== null && props.users.length !== 0;

  const handleSubmit = event => {
    console.log('handleSubmit');
    event.preventDefault();
    event.stopPropagation();
    deleteUsers(props.users);
  };

  const notifySuccess = (text) => {
    toast.success(text);
  }

  const notifyError = (text) => {
    toast.error(text);
  }

  const handleClose = props.close;

  const deleteUser = (user) => {
    const fullName = user.namefirst + ' ' + user.namelast;
    const userId = user.userid;
    console.log('Id to delete: ' + userId);
    const url = 'http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users/' + userId + '.json';

    const config = {
      "headers": {
        "Authorization": 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM='
      }
    };
    axios.delete(url, config)
      .then(response => {
        console.log(response);
        notifySuccess('User ' + fullName + ' is deleted');
        setTimeout(() => {
          handleClose();
        }, 3000);
      })
      .catch(error => {
        console.log('error fetching and parsing data', error);
        const errorCode = error.response.status;
        let message = errorCode !== 400 ? 'Error in deleting user: ' + fullName : 
        'Bad Request. Invalid syntax, missing required argument or invalid request.';
        notifyError(message);
      });
  } 

  const deleteUsers = (users) => {
    users.forEach(user => {
      deleteUser(user);
    });
  }

  const listUsers = (users) => {
    return (
      <ul>
        {users.map((user, index) => {
          return <li key={index}>{user.namefirst} {user.namelast}</li>
        })}
      </ul>
    )
  }

  return ( 
    <Modal show={show} onHide={handleClose} className="col-8">
        <Modal.Header closeButton>
          <Modal.Title>Delete Selected Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="Names">
            <Form.Label className='list'>{listUsers(props.users)}</Form.Label>
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
          <Form onSubmit={handleSubmit}>
            <Button className="button" variant="secondary" onClick={props.close}>
              Cancel
            </Button>
            <Button className="button" variant="primary" type="submit">
              Confirm Deletion 
            </Button>
          </Form>
        </Modal.Body>
  
      </Modal>
  );
}




export default DeleteUsersForm;
