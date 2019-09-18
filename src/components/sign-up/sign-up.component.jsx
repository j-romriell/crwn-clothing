import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import {auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import { selectUserProfile } from '../../redux/user/user.selectors';

import './sign-up.styles.scss';
import { createStructuredSelector } from 'reselect';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        const {displayName, email, password, confirmPassword } = this.state;
        const { signUpStart } = this.props;

        if(password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        signUpStart( {displayName, email, password});
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({[name]: value})
    }

    render() {
        const { userProfile } = this.props;
        const {displayName, email, password, confirmPassword } = this.state;
        console.log("render - userProfile: " + userProfile.displayName);

        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and pasword</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='confirmPassword'
                        required
                    />
                    <CustomButton type='submit'> SIGN UP </CustomButton>
                </form>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector ({
    userProfile: selectUserProfile
});

const mapDispatchToProps = dispatch => ({
    signUpStart: userProfile => dispatch(signUpStart(userProfile))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);