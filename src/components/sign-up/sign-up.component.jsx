import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import { selectUserProfile } from '../../redux/user/user.selectors';

import './sign-up.styles.scss';
import { createStructuredSelector } from 'reselect';

const SignUp = ({signUpStart, userProfile}) => {
    const [userCredentials, setUserCredentials] = useState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
    });

    const {displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        signUpStart( {displayName, email, password});
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({...userCredentials, [name]: value})
    }

    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and pasword</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='confirmPassword'
                    required
                />
                <CustomButton type='submit'> SIGN UP </CustomButton>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    userProfile: selectUserProfile
});

const mapDispatchToProps = dispatch => ({
    signUpStart: userProfile => dispatch(signUpStart(userProfile))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);