import React, { Component } from "react";
import axios from 'axios';
import { API_ROOT } from '../constants';

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
                    <div className="aboutInfo">
                        <h2>{this.state.company_name}</h2>
                        <br></br>
                        <p>{this.state.company_address}</p>
                        <p>{this.state.phone_number}</p>
                        <p>{this.state.email}</p>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Contact;