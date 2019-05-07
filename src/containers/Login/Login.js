import React, { Component } from 'react';
import './Login.css';

import validate from './../../common/validate';

class Login extends Component {

    state = {
        controls: {
            password: {
                value: '',
                valid: false,
                validationRules: {
                    isPassword: true
                },
                touched: false
            },
            username: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            }
        }
    }

    componentWillMount() {
        if (localStorage.getItem('data')) {
            this.props.history.push('/home');
        }
    }


    submitHandler = (event) => {
        event.preventDefault();
        const data = {
            mobileNumber: this.state.controls.username.value,
            password: this.state.controls.password.value
        };
        console.log('data: ', data);
        localStorage.setItem('data', JSON.stringify(data));
        this.props.history.push('/home');

    }

    updateInputState = (key, event) => {
        let value = event.target.value;
        let connectedValue = {};

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };

    render() {
        let valid = (this.state.controls.username.valid && this.state.controls.password.valid);
        return (
            <div className="container">
                <header className="login-header">
                    <span className="span-text">WELCOME TO</span><br />
                </header>
                <div className="loginFormDiv">
                    <h4>Login</h4>
                    <form className="login-form" autoComplete="off">
                        <div className="form-control">
                            <input onChange={(event) => this.updateInputState('username', event)}
                                value={this.state.controls.username.value} className="form-control-input" type="email" name="" id="" />
                            <span className="error-filed" style={{ display: (!this.state.controls.username.valid && this.state.controls.username.touched) ? 'flex' : 'none' }}>
                                Provide a valid email.
                            </span>
                        </div>
                        <div className="form-control">
                            <input onChange={(event) => this.updateInputState('password', event)}
                                value={this.state.controls.password.value} className="form-control-input" type="password" name="" id="" />
                            <span className="error-filed" style={{ display: (!this.state.controls.password.valid && this.state.controls.password.touched) ? 'flex' : 'none' }}>
                                Provide a valid password.
                            </span>
                        </div>
                        <button style={{ opacity: !valid ? 0.7 : 1 }} type="submit" onClick={this.submitHandler}>Login</button>
                    </form>
                </div>
            </div>
        )
    }

}


export default Login;
