import React, { Component, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { API_ROOT } from '../constants';
import { connect } from 'react-redux';

class AboutAdmin extends Component {
    state = {
        edit: false,
        motto: "",
        who_we_are: "",
        motto_saved: "",
        who_we_are_saved: "",
    }

    componentDidMount() {
        this.setState({
            motto: this.props.user.currentUser.motto,
            who_we_are: this.props.user.currentUser.who_we_are,
            motto_saved: this.props.user.currentUser.motto,
            who_we_are_saved: this.props.user.currentUser.who_we_are
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
        fd.append('motto', this.state.motto);
        fd.append('who_we_are', this.state.who_we_are);
        axios.post(`${API_ROOT}/api/v1/updateAbout`, fd)
            .then(res => {
                console.log(res.data);
                alert('changes saved.')
                this.setState({
                    motto_saved: res.data.motto,
                    who_we_are_saved: res.data.who_we_are
                })
            }).catch(error => alert(error));
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>About</h1>
                    <div className="aboutForm">
                        {
                            this.state.edit ?
                                <Fragment>
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Motto</Form.Label>
                                            <Form.Control type="text" placeholder="motto"
                                                value={this.state.motto} name="motto" onChange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Who we are</Form.Label>
                                            <Form.Control as="textarea" rows="4"
                                                value={this.state.who_we_are} name="who_we_are" onChange={this.handleChange} />
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
                        <h3>{this.state.motto_saved}</h3>
                        <p>{this.state.who_we_are_saved}</p>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(AboutAdmin);
