import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { API_ROOT } from '../constants';

class About extends Component {
    state = {
        motto: "",
        who_we_are: "",
    }

    componentDidMount() {
        axios.get(`${API_ROOT}/api/v1/aboutInfo`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    motto: res.data.motto,
                    who_we_are: res.data.who_we_are,
                })
            }).catch(error => alert(error));
    }

    render() {
        return (
            <div className="gallery2">

                <div className="container">

                    <div className="containerEclatAbout">
                        <div className="aboutInfoEclat">
                            <div className="mottoSize">
                                <p>{this.state.motto}</p>
                            </div>

                            <br></br>
                            <p>{this.state.who_we_are}</p>
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

export default connect(mapStateToProps, null)(About);

