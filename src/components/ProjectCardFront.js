import React, { Component, Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { API_ROOT } from '../constants';



class ProjectCardFront extends Component {
    state = {
        show: false,
        selectedFiles: [],
        photos: [],
        pictureShow: false,
        carouselShow: false,
        src: "",
        address: "",
        beds: "",
        baths: "",
        square_feet: "",
        comment: "",
        completionDate: "",
        avatar: "",

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

    handleProfileShow = () => {
        this.setState({
            src: this.props.project.photo,
            carouselShow: true
        })
    }

    handleProfileClose = () => {
        this.setState({
            carouselShow: false
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
        // const array = this.state.photos;
        const five_photos = this.state.photos.slice(0, 5);
        return (
            <div className="projectDivEclat">
                <div className="projectInfoDivEclat">
                    <div className="projectAvatarEclat">
                        <img alt="new" src={this.state.avatar} className="imageProjectSmall"
                            onClick={() => this.handleProfileShow()}></img>
                    </div>
                    <div className="projectInformation">
                        <div className="address">
                        <p>{this.state.address}</p>
                        </div>
                        

                        <p>Beds: {this.state.beds}   /  Baths: {this.state.baths}   /   Sqft: {this.state.square_feet}</p>
                        {/* <p>Completion Date: {this.state.completionDate}</p> */}
                        <p>{this.state.comment}</p>


                    </div>

                </div>
                <div className="projectPicturesDivEclat">
                    {
                        five_photos.map(photo => {
                            return <Fragment>
                                <img key={photo.id} src={photo.photo} className="imageProjectSmall2"
                                    alt="new"  width="100" onClick={() => this.handlePictureShow(photo.id)}></img>
                            </Fragment>
                        })
                    }
                    <Modal
                        size="lg"
                        show={this.state.pictureShow}
                        onHide={this.handlePictureClose}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <img src={this.state.src}
                            alt="new" className="centerEclat"></img>
                    </Modal>
                    <Modal
                        size="lg"
                        show={this.state.carouselShow}
                        onHide={this.handleProfileClose}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
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

        )
    }
}

export default ProjectCardFront;