import React, { Component, Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { API_ROOT } from '../constants';



class ProjectCardFront extends Component {
    state = {
        show: false,
        selectedFiles: [],
        photos: [],
        pictureShow: false,
        src: "",
        address: "",
        beds: "",
        baths: "",
        square_feet: "",
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
                    completionDate: this.props.project.completion_date,
                    avatar: this.props.project.photo,
                })
            })

    }

    handleProfileShow = () => {
        this.setState({
            src: this.props.project.photo,
            pictureShow: true
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
            <div className="projectDivEclat">
                <div className="projectInfoDivEclat">
                    <div className="projectAvatarEclat">
                        <img alt="new" src={this.state.avatar} className="imageProjectSmall"
                             onClick={() => this.handleProfileShow()}></img>
                    </div>
                    <div>
                        <h1>{this.state.address}</h1>
                        
                        <p>Beds: {this.state.beds}   /  Baths: {this.state.baths}   /   Sqft: {this.state.square_feet}</p>
                        {/* <p>Completion Date: {this.state.completionDate}</p> */}
                       
                       
                    </div>

                </div>
                <div className="projectPicturesDivEclat">
                    {
                        this.state.photos.map(photo => {
                            return <Fragment>
                                <img key={photo.id} src={photo.photo} className="imageProjectSmall"
                                    alt="new" height="92" width="100" onClick={() => this.handlePictureShow(photo.id)}></img>
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

                </div>
            </div>

        )
    }
}

export default ProjectCardFront;