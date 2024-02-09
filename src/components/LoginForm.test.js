import React from 'react';
import { render,fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/LoginForm';

test('Renders Login component sucessfully', () => {
    const {getByPlaceholderText,getByRole} = render(<LoginForm />)
    // const inputField = getByPlaceholderText('Enter Email')
    // screen.debug(inputField);
    expect(getByPlaceholderText('Enter Email')).toBeInTheDocument();
    expect(getByRole('button', {
        name: /login/i
    })).toBeInTheDocument(); 
})
test('Validates Email Feild', ()=> {
    const {getByPlaceholderText,getByRole,getByText,queryByText} = render(<LoginForm />)
    const inputField = getByPlaceholderText('Enter Email')
    const button = getByRole('button', {
        name: /login/i
    })
    // entering Invalid email
    fireEvent.change(inputField, {target: {value: 'Email is Invalid'} })
    fireEvent.submit(button);
    expect(getByText('Email is Invalid')).toBeInTheDocument();

     // entering valid email
     fireEvent.change(inputField, {target: {value: 'aramadak@gmail.com'} })
     fireEvent.submit(button);
     expect(queryByText('Email is Invalid')).toBeNull();
})

test('Validates Password Feild', ()=> {
    const {getByPlaceholderText,getByRole,getByText,queryByText} = render(<LoginForm/>)

    const passwordFeild = getByPlaceholderText('Password')
    const button = getByRole('button', {name: /login/i})

    expect(passwordFeild).toBeInTheDocument();

    // entering Empty Password feild
    fireEvent.change(passwordFeild, {target: {value:''}})
    fireEvent.click(button)

    expect(getByText('Password is required')).toBeInTheDocument();
    // screen.debug();

     // entering less charcters Password feild
    fireEvent.change(passwordFeild, {target: {value:'abcfee'}})
    fireEvent.click(button)

    expect(getByText('Password should have more than 7 charcters')).toBeInTheDocument();
    // screen.debug();

    // validates Password feild
    fireEvent.change(passwordFeild, {target: {value:'12345678'}})
    fireEvent.click(button)
    expect(queryByText('Password should have more than 7 charcters')).toBeNull()
})

test('Login Sucessfully with Email and passwordd feild', async()=> {
    const {getByRole,getByPlaceholderText} = render(<LoginForm/>)

    const loginButton = getByRole('button', { name: /login/i})
    const passwordFeild = getByPlaceholderText('Password')
    const inputField = getByPlaceholderText('Enter Email')

    expect(loginButton).toBeInTheDocument();

    fireEvent.change(inputField, {target: {value: 'arams@gmail.com'} })
    fireEvent.change(passwordFeild, {target: {value:'12345678910'}})

    fireEvent.click(loginButton);
    screen.debug(loginButton)

    await waitFor(() => {
        expect(inputField.value).toBe('')
        expect(passwordFeild.value).toBe('')
    })
})