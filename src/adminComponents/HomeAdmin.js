import React, { Component, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { API_ROOT } from '../constants';
import { connect } from 'react-redux';



class HomeAdmin extends Component {
    state = {
        edit: false,
        selectedFile: [],
        avatar: ""
    }

    editClick = () => {
        this.setState(prevState => {
            return {
                edit: !prevState.edit
            }
        })
    }

    handleSelectedFile = (event) => {
        event.preventDefault();
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        if (this.state.selectedFile.length === 0) {
            alert('no file chosen');
        } else {
            const file = this.state.selectedFile;
            if (!file) return;

            

            const payload = await fetch(`${API_ROOT}/s3/direct_post`).then(res =>
                res.json()
            );

            const url = payload.url;
            const formData = new FormData();

            Object.keys(payload.fields).forEach(key =>
                formData.append(key, payload.fields[key])
            );
            formData.append('file', file);

            const xml = await fetch(url, {
                method: 'POST',
                body: formData
            }).then(res => res.text());

            const uploadUrl = new DOMParser()
                .parseFromString(xml, 'application/xml')
                .getElementsByTagName('Location')[0].textContent;
            const fd = new FormData();
            fd.append('photo', this.state.selectedFile);
            fd.append('url', uploadUrl);
            axios.post(`${API_ROOT}/api/v1/update`, fd)
                .then(res => {
                    console.log(res.data);
                    alert('New logo updated');
                    this.setState({
                        avatar: res.data.avatar
                    })
                }).catch(error => alert(error));
        }
    }

    render() {
        return (
            <div>
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
                    <div className="aboutInfo">
                        <img src={
                            this.state.avatar === "" ?
                                this.props.user.currentUser.avatar :
                                this.state.avatar
                        } alt="logo" className="homeLogoAdmin"></img>
                    </div>
                </div >
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(HomeAdmin);

