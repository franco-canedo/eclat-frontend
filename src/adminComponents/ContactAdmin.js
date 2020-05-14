import React, { Component, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { API_ROOT } from '../constants';
import { connect } from 'react-redux';

class ContactAdmin extends Component {
    state = {
        edit: false,
        company_name: "",
        company_address: "",
        email: "",
        phone_number: "",
        company_name_saved: "",
        company_address_saved: "",
        email_saved: "",
        phone_number_saved: ""
    }

    componentDidMount() {
        this.setState({
            company_name: this.props.user.currentUser.company_name,
            company_address: this.props.user.currentUser.company_address,
            email: this.props.user.currentUser.email,
            phone_number: this.props.user.currentUser.phone_number,
            company_name_saved: this.props.user.currentUser.company_name,
            company_address_saved: this.props.user.currentUser.company_address,
            email_saved: this.props.user.currentUser.email,
            phone_number_saved: this.props.user.currentUser.phone_number,
        })
    }

    editClick = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                edit: !prevState.edit
            }
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('company_name', this.state.company_name);
        fd.append('company_address', this.state.company_address);
        fd.append('email', this.state.email);
        fd.append('phone_number', this.state.phone_number);
        axios.post(`${API_ROOT}/api/v1/updateContact`, fd)
            .then(res => {
                console.log(res.data);
                alert('changes saved.')
                this.setState({
                    company_name: res.data.company_name,
                    company_address: res.data.company_address,
                    email: res.data.email,
                    phone_number: res.data.phone_number,
                })
            }).catch(error => alert(error));
    }

    render() {
        return (
            <div>

                <div className="container">

                    <h1>Contact</h1>
                    <div className="aboutForm">
                        {
                            this.state.edit ?
                                <Fragment>
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Company Name</Form.Label>
                                            <Form.Control type="text" placeholder="company name"
                                                value={this.state.company_name} name="company_name" onChange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Company Address</Form.Label>
                                            <Form.Control type="text" placeholder="company address"
                                                value={this.state.company_address} name="company_address" onChange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="text" placeholder="email"
                                                value={this.state.email} name="email" onChange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" placeholder="phone number"
                                                value={this.state.phone_number} name="phone_number" onChange={this.handleChange} />
                                        </Form.Group>
                                    </Form>
                                    <Button variant="dark" onClick={this.editClick}>Cancel</Button>
                                    <Button variant="primary" onClick={this.handleSubmit}>Save</Button>
                                </Fragment>
                                :
                                <Button variant="dark" onClick={this.editClick}>Edit</Button>
                        }
                    </div>
                    <div className="aboutInfo">
                        <h3>{this.state.company_name_saved}</h3>
                        <p>{this.state.company_address_saved}</p>
                        <p>{this.state.email_saved}</p>
                        <p>{this.state.phone_number_saved}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(ContactAdmin);
