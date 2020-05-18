import React, { Component } from "react";
import axios from 'axios';
import { API_ROOT } from '../constants';
import Carousel from 'react-bootstrap/Carousel';

class Home extends Component {
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
            <div className="gallery2">

                <div className="container2">
                    <Carousel className="carouselHome">
                        {
                            this.state.photos.map(photo => {
                                return <Carousel.Item>
                                    <img                        
                                        src={photo.photo}
                                        alt="Home"
                                        className="carouselPictures"
                                    />
                                </Carousel.Item>
                            })
                        }
                    </Carousel>

                </div>
            </div>
        );
    }
}

export default Home;