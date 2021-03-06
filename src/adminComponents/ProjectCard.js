import React, { Component, Fragment } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { API_ROOT } from '../constants';
import EditModal from './EditModal';

class ProjectCard extends Component {
    state = {
        form: false,
        show: false,
        selectedFiles: [],
        photos: [],
        pictureShow: false,
        src: "",
        editShow: false,
        address: "",
        beds: "",
        baths: "",
        comment: "",
        square_feet: "",
        completionDate: "",
        avatar: "",
        profileShow: false,

    }

    componentDidMount() {
        axios.get(`${API_ROOT}/projects/${this.props.project.id}`)
            .then(res => {
                console.log(res.data.project_pictures);
                this.setState({
                    photos: res.data.project_pictures,
                    address: this.props.project.address,
                    beds: this.props.project.beds,
                    baths: this.props.project.baths,
                    square_feet: this.props.project.square_feet,
                    comment: this.props.project.comment,
                    completionDate: this.props.project.completion_date,
                    avatar: this.props.project.photo,
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

    uploadHandler = async e => {
        e.preventDefault();


        if (this.state.selectedFiles.length === 0) {
            alert('no file chosen');
        } else {
            for (let i = 0; i < this.state.selectedFiles.length; i++) {
                const file = this.state.selectedFiles[i];
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
                fd.append('avatar', this.state.selectedFiles[i]);
                fd.append('project_id', this.props.project.id);
                fd.append('url', uploadUrl);
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

    handleEditProjectInfo = (state, photo) => {
        console.log(photo);
        let avatar = this.state.avatar;
        if (photo !== undefined) {
            avatar = photo
        }
        this.setState({
            address: state.address,
            beds: state.beds,
            baths: state.baths,
            square_feet: state.square_feet,
            comment: state.comment,
            completionDate: state.completionDate,
            avatar: avatar,
        })
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

    handleProfileShow = () => {
        this.setState({
            src: this.props.project.photo,
            profileShow: true
        })
    }

    handleProfileClose = () => {
        this.setState({
            profileShow: false
        })
    }

    handlePictureClose = () => {
        this.setState({
            pictureShow: false
        })
    }

    handleEditShow = () => {
        this.setState({
            editShow: true
        })
    }

    handleEditClose = () => {
        this.setState({
            editShow: false
        })
    }

    render() {
        return (
            <div className="projectDiv">
                <div className="projectInfoDiv">
                    <div className="projectAvatar">
                        <img alt="new" src={this.state.avatar}
                            height="115" width="100" onClick={() => this.handleProfileShow()}></img>
                    </div>
                    <div>
                        <h3>{this.state.address}</h3>
                        <br></br>
                        <p>Beds: {this.state.beds} | Baths: {this.state.baths} | Sqft: {this.state.square_feet}</p>
                        {/* <p>Completion Date: {this.state.completionDate}</p> */}
                        <p>Comment: {this.state.comment}</p>
                        <p></p>
                        <p></p>


                        <Button variant="outline-danger" className="projectDelete"
                            id={this.props.project.id} onClick={this.handleShow}>Delete</Button>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.address}</Modal.Title>
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
                            onClick={this.handleEditShow}>Edit</Button>
                        <EditModal show={this.state.editShow} onHide={this.handleEditClose}
                            project={this.props.project} handleEditProjectInfo={this.handleEditProjectInfo} />
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
                        {/* <Modal.Body>...</Modal.Body> */}
                        <Button variant="outline-danger" onClick={this.deletePhoto}>Delete</Button>
                    </Modal>
                    <Modal
                        size="lg"
                        show={this.state.profileShow}
                        onHide={this.handleProfileClose}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">

                            </Modal.Title>
                        </Modal.Header>
                        <img src={this.state.src}
                            alt="new" className="center"></img>
                        {/* <Modal.Body>...</Modal.Body> */}

                    </Modal>

                </div>
            </div>
        );
    }
}

export default ProjectCard;