import React, { Component } from "react";
import axios from 'axios';
import { API_ROOT } from '../constants';

class Gallery extends Component {
    state = {
        photos: []
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

    render() {
        return (
            <div className="gallery">

                <div className="container">

                    <div className="containerEclatGallery">
                        {
                            this.state.photos.map(photo => {
                                return <div className="pictureCardEclat">
                                    <img id={photo.id} key={photo.id} alt="user pictures" src={photo.photo}
                                        className="image"
                                    ></img>
                                </div>
                            })
                        }
                    </div>
                </div>
                </div>

        );
    }
}

export default Gallery;