import React, { Component, Fragment } from "react";
import logo from '../logos/medium white.png';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_ROOT } from '../constants';


class Header extends Component {
    state = {
        logo: ""
    }

    componentDidMount() {
        axios.get(`${API_ROOT}/api/v1/logo`)
        .then(res => {
            console.log(res.data);
            this.setState({
                logo: res.data.avatar
            })
        }).catch(error => alert(error));
    }

    render() {
        return (
            <div className="header">
                <div className="Elogo">
                    {/* <h1 onClick={this.props.homeClick}>Eclat Homes</h1> */}
                    <img alt="logo" src={this.state.logo} onClick={this.props.homeClick}
                     className="logoImg"></img>
                </div>
                <div className="navLinks">
                    <button onClick={this.props.galleryClick} className="headerButtons">GALLERY</button>
                    <button onClick={this.props.currentProjectClick} className="headerButtons">PROJECTS</button>
                    <button onClick={this.props.aboutClick} className="headerButtons">ABOUT</button>
                    <button onClick={this.props.contactClick} className="headerButtons">CONTACT</button>
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

export default connect(mapStateToProps, null)(Header);

