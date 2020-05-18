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

    render() {
        return (
            <div className="gallery">

                <div className="container">

                    <div className="containerEclatAbout">
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
                               
                                <Form.Control type="text" placeholder="Name *" />
                                
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                
                                <Form.Control type="email" placeholder="Email *" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                
                                <Form.Control type="text" placeholder="Subject" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                
                                <Form.Control as="textarea" placeholder="Message..." />
                            </Form.Group>
                            
                            <Button variant="outline-primary" type="submit">
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