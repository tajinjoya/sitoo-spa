import React from 'react';
import {
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const DeleteUsersForm = (props) => {

  const show = props.users !== null && props.users.length !== 0;

  const handleSubmit = event => {
    console.log('handleSubmit');
    event.preventDefault();
    event.stopPropagation();
    deleteUsers(props.users);
  };

  const handleClose = props.close;

  const deleteUser = (user) => {
    console.log('Id to delete: ' + user.id);
    const url = 'http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users/' + user.id + '.json';

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
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Selected Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="Names">
            <Form.Label className='list'>{listUsers(props.users)}</Form.Label>
          </Form.Group>
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
