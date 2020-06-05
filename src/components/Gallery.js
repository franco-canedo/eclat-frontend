import React, { Component } from "react";
import axios from 'axios';
import { API_ROOT } from '../constants';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

class Gallery extends Component {
    state = {
        photos: [],
        pictureShow: false,
        src: "",
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

    handlePictureClose = () => {
        this.setState({
            pictureShow: false
        })
    }

    handlePictureShow = (id) => {
        const photo = this.state.photos.find(p => p.id === id);
        const src = photo.photo
        this.setState({
            src: src,
            pictureShow: true
        })
    }

    render() {
        return (
            <div className="gallery">

                <div className="container">

                    <div className="containerEclatGallery">
                        {
                            this.state.photos.map(photo => {
                                return <div className="pictureCardEclat">
                                    <img id={photo.id} key={photo.id} alt="user pictures" src={photo.photo}
                                        className="image" onClick={() => this.handlePictureShow(photo.id)}
                                    ></img>
                                </div>
                            })
                        }
                        <Modal
                            size="lg"
                            show={this.state.pictureShow}
                            onHide={this.handlePictureClose}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            {/* <Modal.Header closeButton>
                               
                            </Modal.Header> */}
                            {/* <img src={this.state.src}
                                alt="new" className="centerEclat"></img> */}
                            <Carousel className="carouselHome">

                                <Carousel.Item>
                                    <img
                                        src={this.state.src}
                                        alt="Home"
                                        className="centerEclat"
                                    />
                                </Carousel.Item>
                                {
                                    this.state.photos.map(photo => {
                                        return <Carousel.Item>
                                            <img
                                                src={photo.photo}
                                                alt="Home"
                                                className="centerEclat"
                                            />
                                        </Carousel.Item>
                                    })
                                }
                            </Carousel>

                        </Modal>
                    </div>
                </div>
            </div>

        );
    }
}

export default Gallery;