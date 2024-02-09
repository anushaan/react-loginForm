import React, {useState} from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginForm.css';
import { Form, Button, InputGroup,Col } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const ValidateForm = () => {
    const errors = {}
    let isValid = true;

    if(!email) {
      errors.email = 'Email is required';
      isValid = false
    }
    else if(!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is Invalid';
      isValid = false
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }else if(password.length <= 7){
      errors.password = 'Password should have more than 7 charcters';
      isValid = false;
    }
    setErrors(errors)
    return isValid;
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      ValidateForm(); 
      setEmail('');
      setPassword('')
      console.log("Email", email)
      console.log("Password", password)
  };


  return (
    <div className="container mt-5 bg-warning p-3">
      <h1 className='text-center m-3 p-1 font-weight-bold'>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group 
          as={Col} xs={12}
          className="mb-3 position-relative w-100 h-25 
          d-flex justify-content-start"
        >
          <Form.Control 
            className="w-100 h-100 bg-white border border-none 
            rounded rounded-lg border-secondary" 
            type="email" placeholder='Enter Email'
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputGroup.Text 
            className="w-25 d-flex justify-content-end 
              bg-white align-items-center border rounded-lg border-0 position-absolute" 
              style={{ right: 10, top: '50%', transform: 'translateY(-50%)' }}
          >
            <MdEmail />
          </InputGroup.Text>
        </Form.Group>
        {errors.email && <div className="text-danger">{errors.email}</div>}
        <Form.Group 
          as={Col} xs={12}
          className="mb-3 position-relative w-100 h-25 
          d-flex justify-content-start"
        >
          <Form.Control 
            className="w-100 h-100 bg-white border border-none 
            rounded rounded-lg border-secondary" 
            type="password" placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <InputGroup.Text 
            className="w-25 d-flex justify-content-end 
              bg-white align-items-center border rounded-lg border-0 position-absolute" 
              style={{ right: 10, top: '50%', transform: 'translateY(-50%)' }}
          >
            <RiLockPasswordFill />
          </InputGroup.Text>
        </Form.Group>
        {errors.password && <div className="text-danger">{errors.password}</div>}
        <Form.Group 
          as={Col} xs={12}
          className="d-flex justify-content-between remeber"
        >
          <Form.Check type="checkbox" label='Remember me' />
          <a href="/#" className="text-dark forgot-password">
            Forgot Password
          </a>
        </Form.Group>
        
        <Button variant="info" 
          className="w-100 h-25 border border-0 
          font-weight-bold rounded rounded-lg" 
          type="submit"
        >
          Login
        </Button>
        <div className="m-2 p-2 d-flex justify-content-center m-2 register">
          <p className="me-2">Don't have an account?</p>
          <a href="/#" className="text-dark font-weight-bold">Register</a>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
