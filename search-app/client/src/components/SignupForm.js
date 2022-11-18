// comment out 'createuser'
// import { createUser } from '../utils/API';

// import ADD_USER for functionality 
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations';
import { Form, Button, Alert } from 'react-bootstrap';
import React, { useState } from 'react';

import Auth from '../utils/auth';

// refactored SignupForm function for Apollo
const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState)

    try {
      const { data } = await addUser({
        // const response = await createUser(userFormData);
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>
  
        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={formState.name}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={formState.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={formState.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(formState.username && formState.email && formState.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
      {error && (
        <div> {error.message} </div>
      )}
    </>
  );
  };

  export default SignupForm;

// unused code
    // if (!response.ok) {
    //   throw new Error('something went wrong!');
    // }

    //   const { token, user } = await response.json();
    //   console.log(user);
    //   Auth.login(token);
    // } catch (err) {
    //   console.error(err);
    //   setShowAlert(true);
    // }
  
  // const SignupForm = () => {
  //   // set initial form state
  //   const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  //   // set state for form validation
  //   const [validated] = useState(false);
  //   // set state for alert
  //   const [showAlert, setShowAlert] = useState(false);

  // check if form has everything (as per react-bootstrap docs)
  // const form = event.currentTarget;
  // if (form.checkValidity() === false) {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }

//   setUserFormData({
//     username: '',
//     email: '',
//     password: '',
//   });
// };


