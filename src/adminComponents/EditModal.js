import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_ROOT } from '../constants';

class EditModal extends Component {
    state = {
        address: "",
        beds: "",
        baths: "",
        square_feet: "",
        completionDate: "",
        avatar: [],
    }

    componentDidMount() {
        this.setState({
            address: this.props.project.address,
            beds: this.props.project.beds,
            baths: this.props.project.baths,
            square_feet: this.props.project.square_feet,
            completionDate: this.props.project.completionDate,
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    fileSelectedHandler = (event) => {
        event.preventDefault();
        this.setState({
            avatar: event.target.files[0]
        })
    }

    saveChangesHandler = (event) => {
        event.preventDefault();
        if (this.state.avatar.length === 0) {
            const fd = new FormData();
            fd.append('address', this.state.address);
            fd.append('beds', this.state.beds);
            fd.append('baths', this.state.baths);
            fd.append('completion_date', this.state.completionDate);
            fd.append('square_feet', this.state.square_feet);
            fd.append('id', this.props.project.id);
            axios.post(`${API_ROOT}/editProject`, fd)
            .then(res => {
                console.log(res.data);
                alert('Changes saved');
                this.setState({
                    address: res.data.address,
                    beds: res.data.beds,
                    baths: res.data.baths,
                    square_feet: res.data.square_feet,
                    completionDate: res.data.completion_date,
                })
                this.props.handleEditProjectInfo(this.state)
                this.props.onHide();
            }).catch(error => alert(error));
        } else {
            const fd = new FormData();
            fd.append('address', this.state.address);
            fd.append('beds', this.state.beds);
            fd.append('baths', this.state.baths);
            fd.append('completion_date', this.state.completionDate);
            fd.append('square_feet', this.state.square_feet);
            fd.append('avatar', this.state.avatar);
            fd.append('id', this.props.project.id);
            axios.post(`${API_ROOT}/editProject`, fd)
            .then(res => {
                console.log(res.data);
                alert('Changes saved');
                this.setState({
                    address: res.data.address,
                    beds: res.data.beds,
                    baths: res.data.baths,
                    square_feet: res.data.square_feet,
                    completionDate: res.data.completion_date,
                })
                this.props.handleEditProjectInfo(this.state, res.data.photo)
                this.props.onHide();
            }).catch(error => alert(error));
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.project.address}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Edit Information</h4>
                    <Form>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St"
                                value={this.state.address} name="address" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group controlId="formGridEmail">
                                <Form.Label>Bedrooms</Form.Label>
                                <Form.Control type="text" placeholder="Enter # beds"
                                    value={this.state.beds} name="beds" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formGridPassword">
                                <Form.Label>Bathrooms</Form.Label>
                                <Form.Control type="text" placeholder="Enter # baths"
                                    value={this.state.baths} name="baths" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formGridPassword">
                                <Form.Label>Sqft</Form.Label>
                                <Form.Control type="text" placeholder="Enter square feet"
                                    value={this.state.square_feet} name="square_feet" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formGridCity">
                                <Form.Label>Completion Date</Form.Label>
                                <Form.Control type="text" placeholder="11/15/2020"
                                    value={this.state.completionDate} name="completionDate" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formGridCity">
                                <Form.Label>Choose profile picture</Form.Label>
                                <Form.Control type="file"
                                 name="avatar" onChange={this.fileSelectedHandler} />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={this.props.onHide}>Close</Button>
                    <Button variant="primary" onClick={this.saveChangesHandler}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default EditModal;