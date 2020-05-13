import React, { Component } from "react";
import axios from 'axios';
import { API_ROOT, HEADERS } from '../constants';

class GalleryAdmin extends Component {
    state = {
        selectedFile: null
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    uploadHandler = (event) => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post(`${API_ROOT}`, fd)
        .then(res => console.log(res))
    }

    render() {
        return (
            <div>

                <div className="container">

                    <h1>Gallery</h1>
                    <input type="file" onChange={this.fileSelectedHandler}></input>
                    <button onClick={this.uploadHandler}>Upload</button>
                </div>
            </div>

        );
    }
}

export default GalleryAdmin;