import React, { Component, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



class HomeAdmin extends Component {
    state = {
        edit: false,
        selectedFile: [],
    }

    editClick = () => {
        this.setState(prevState => {
            return {
                edit: !prevState.edit
            }
        })
    }

    handleSelectedFile = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleSubmit = () => {

        if (this.state.selectedFile.length === 0) {
            alert('no file chosen');
        } else {
            alert('New logo submited');
        }
    }

    render() {
        return (
            <div className="container">

                <h1>Home</h1>
                <div className="aboutForm">
                    {
                        this.state.edit ?
                            <Fragment>
                                <Form>

                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Select a file to upload</Form.Label>
                                        <Form.Control type="file" onChange={this.handleSelectedFile} />
                                        <Form.Text className="text-muted">
                                            Upload a .png file.
                                        </Form.Text>
                                    </Form.Group>
                                </Form>
                                <Button variant="dark" onClick={this.editClick}>Cancel</Button>
                                <Button variant="primary" onClick={this.handleSubmit} className="buttonMargin">Upload</Button>
                            </Fragment> :
                            <Button variant="dark" onClick={this.editClick}>Edit Logo</Button>
                    }


                </div>
            </div >
        );
    }
}

export default HomeAdmin;