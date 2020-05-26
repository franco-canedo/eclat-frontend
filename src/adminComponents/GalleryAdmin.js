import React, { Component } from "react";
import axios from 'axios';
import { API_ROOT } from '../constants';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class GalleryAdmin extends Component {
    state = {
        selectedFile: [],
        photos: [],
        loading: false,
        url: "",
    }

    componentDidMount() {
        axios.get(`${API_ROOT}/allPhotos`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    photos: res.data
                })
            })

    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files
        })
    }

    uploadHandler = async e => {
        e.preventDefault();
        if (this.state.selectedFile.length === 0) {
            alert('no file chosen');
        } else {
            for (let i = 0; i < this.state.selectedFile.length; i++) {
                const file = this.state.selectedFile[i];
                if (!file) return;

                this.setState({ loading: true });

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

                this.setState({
                    loading: false,
                    url: uploadUrl
                });
                const fd = new FormData();
                fd.append('avatar', this.state.selectedFile[i]);
                fd.append('user_id', this.props.user.currentUser.id);
                fd.append('url', uploadUrl);
                axios.post(`${API_ROOT}/photo`, fd)
                    .then(res => {
                        console.log(res);
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

    deletePicture = (event) => {
        const fd = new FormData();
        fd.append('id', event.target.id)
        axios.post(`${API_ROOT}/deletePhoto`, fd)
            .then(res => {
                alert('Photo succesfully deleted')
                const photo = this.state.photos.find(p => {
                    return p.id === res.data.id
                });
                const newArray = this.state.photos.filter(p => p.id !== photo.id)
                this.setState(prevState => {
                    return {
                        photos: newArray
                    }
                })
            }).catch(error => alert(error));
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Gallery</h1>
                    <div className="galleryContainer">
                        <div className="formGallery">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Upload a Picture</Form.Label>
                                    <Form.Control type="file" multiple onChange={this.fileSelectedHandler} />
                                    <Form.Text className="text-muted">
                                        Upload a .png file
                            </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.uploadHandler}>
                                    Upload
                        </Button>
                            </Form>
                        </div>
                        {/* <input type="file" onChange={this.fileSelectedHandler}></input>
                    <button onClick={this.uploadHandler}>Upload</button> */}
                        <div className="photosContainer">
                            {
                                this.state.photos.map(photo => {
                                    return <div className="pictureCard">
                                        <img id={photo.id} key={photo.id} alt="user pictures" src={photo.photo}
                                            className="image"
                                        ></img>
                                        <div className="left">
                                            <Button variant="dark" onClick={this.deletePicture} id={photo.id}>X</Button>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
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

export default connect(mapStateToProps, null)(GalleryAdmin);
