import React, { Component } from "react";
import axios from 'axios';
import { API_ROOT } from '../constants';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Contact extends Component {
    state = {
        company_name: "",
        company_address: "",
        email: "",
        phone_number: "",
        name: "",
        email_message: "",
        subject: "",
        message: "",
    }

    componentDidMount() {
        axios.get(`${API_ROOT}/api/v1/aboutInfo`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    company_name: res.data.company_name,
                    company_address: res.data.company_address,
                    email: res.data.email,
                    phone_number: res.data.phone_number,
                })
            })

    }

    handleChange = (event) => {
        console.log('change?')
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('name', this.state.name);
        fd.append('email_address', this.state.email_message);
        fd.append('subject', this.state.subject);
        fd.append('message', this.state.message);
        axios.post(`${API_ROOT}/email`, fd)
            .then(res => {
                console.log(res);
                alert('Message sent!');
                this.setState({
                    name: "",
                    email_message: "",
                    subject: "",
                    message: "",
                });
            }).catch(error => alert(error));
    }

    render() {
        return (
            <div className="gallery">

                <div className="container">

                    <div className="containerEclatContact">
                        <div className="aboutInfoEclat">
                            <h2>{this.state.company_name}</h2>
                            <br></br>
                            <p>{this.state.company_address}</p>
                            <p>{this.state.phone_number}</p>
                            <p>{this.state.email}</p>
                        </div>

                        <div className="aboutInfoEclatForm">
                            <h2>Send us a message!</h2>
                            <br></br>
                            <Form>
                                <Form.Group controlId="formBasicEmail">

                                    <Form.Control type="text" placeholder="Name *"
                                        onChange={this.handleChange} name="name" value={this.state.name}   />

                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">

                                    <Form.Control type="email" placeholder="Email *"
                                        name="email_message" onChange={this.handleChange} value={this.state.email_message} />
                                </Form.Group>

                               
                                <Form.Group controlId="formBasicPassword">

                                    <Form.Control as="textarea" placeholder="Message..."
                                        name="message" onChange={this.handleChange} value={this.state.message} />
                                </Form.Group>

                                <Button variant="outline-primary" type="submit" onClick={this.handleSubmit}>
                                    Submit
                            </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;