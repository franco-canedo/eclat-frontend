import React, { Component, Fragment } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { API_ROOT } from '../constants';

class ProjectCard extends Component {
    state = {
        form: false,
        show: false,
        selectedFiles: [],
        photos: [],
        pictureShow: false,
        src: "",
    }

    componentDidMount() {
        axios.get(`${API_ROOT}/projects/${this.props.project.id}`)
            .then(res => {
                console.log(res.data.project_pictures);
                this.setState({
                    photos: res.data.project_pictures
                })
            })

    }

    handleEditClick = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                form: !prevState.form
            }
        })
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFiles: event.target.files
        })
    }

    uploadHandler = (event) => {
        event.preventDefault();
        if (this.state.selectedFiles.length === 0) {
            alert('no file chosen');
        } else {
            for (let i = 0; i < this.state.selectedFiles.length; i++) {
                const fd = new FormData();
                fd.append('avatar', this.state.selectedFiles[i]);
                fd.append('project_id', this.props.project.id)
                axios.post(`${API_ROOT}/projectPicture`, fd)
                    .then(res => {
                        console.log(res.data);
                        this.setState(prevState => {
                            return {
                                photos: [...prevState.photos, res.data]
                            }
                        })
                    }).catch(error => alert(error));
            }
            alert('Files uploaded');

        }

    }

    deletePhoto = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('id', this.state.modalId);
        axios.post(`${API_ROOT}/deleteProjectPicture`, fd)
            .then(res => {
                console.log(res.data);
                alert('Photo succesfully deleted');
                const photo = this.state.photos.find(p => {
                    return p.id === res.data.id
                });
                const newArray = this.state.photos.filter(p => p.id !== photo.id);
                this.setState(prevState => {
                    return {
                        photos: newArray
                    }
                })
                this.handlePictureClose();
            }).catch(error => alert(error));
        
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handlePictureShow = (id) => {
        const photo = this.state.photos.find(p => p.id === id);
        const src = photo.photo
        this.setState({
            src: src,
            modalId: id,
            pictureShow: true
        })
    }

    handlePictureClose = () => {
        this.setState({
            pictureShow: false
        })
    }

    render() {
        return (
            <div className="projectDiv">
                <div className="projectInfoDiv">
                    <div className="projectAvatar">
                        <img></img>
                    </div>
                    <div>
                        <h3>{this.props.project.address}</h3>
                        <br></br>
                        <p>Beds: {this.props.project.beds} | Baths: {this.props.project.baths}</p>
                        <p>Completion Date: {this.props.project.completion_date}</p>

                        <Button variant="outline-danger" className="projectDelete"
                            id={this.props.project.id} onClick={this.handleShow}>Delete</Button>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.props.project.address}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                            </Button>
                                <Button variant="primary" onClick={() => {
                                    this.props.handleDelete(this.props.project.id)
                                    this.handleClose()
                                }}>
                                    Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        <Button variant="outline-dark" className="projectDelete"
                            onClick={this.handleEditClick}>Edit</Button>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Upload a Picture</Form.Label>
                                <Form.Control type="file" multiple onChange={this.fileSelectedHandler} />
                                <Form.Text className="text-muted">
                                    Upload a .png file
                            </Form.Text>
                            </Form.Group>
                            <Button variant="success" type="submit" onClick={this.uploadHandler}>
                                Upload
                        </Button>
                        </Form>
                    </div>

                </div>
                <div className="projectPicturesDiv">
                    {
                        this.state.photos.map(photo => {
                            return <Fragment>
                                <img key={photo.id} src={photo.photo}
                                    alt="new" height="50" width="50" onClick={() => this.handlePictureShow(photo.id)}></img>
                            </Fragment>
                        })
                    }
                    <Modal
                        size="lg"
                        show={this.state.pictureShow}
                        onHide={this.handlePictureClose}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                               
                                        </Modal.Title>
                        </Modal.Header>
                        <img src={this.state.src}
                            alt="new" className="center"></img>
                        <Modal.Body>...</Modal.Body>
                        <Button variant="outline-danger" onClick={this.deletePhoto}>Delete</Button>
                    </Modal>

                </div>
            </div>
        );
    }
}

export default ProjectCard;