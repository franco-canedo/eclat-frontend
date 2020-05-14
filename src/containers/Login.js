import React, { Component, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { userLoginFetch } from '../actions';
import { Redirect } from "react-router-dom";


class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.userLoginFetch(this.state);
        this.setState({
            username: "",
            password: "",
        })
    }

    render() {
        return this.props.isLogged ? (
            <Redirect to="/adminHome" things={this.state} />) : (
                <div className="login">
                    <div>
                        <h1>Login</h1>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={this.handleChange} name="username"
                                    value={this.state.username} type="username" placeholder="Enter username" />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.handleChange} name="password"
                                    value={this.state.password} type="password" placeholder="Password" />
                            </Form.Group>

                            <Button onClick={this.handleSubmit} variant="primary" type="submit">
                                Submit
                    </Button>
                        </Form>
                    </div>

                </div>
            );
    }
}

const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

const mapStateToProps = state => {
    return {
        isLogged: state.isLogged
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

