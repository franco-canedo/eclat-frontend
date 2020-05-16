import React, { Component, Fragment } from "react";
import logo from '../logos/medium white.png'


class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="Elogo">
                    {/* <h1 onClick={this.props.homeClick}>Eclat Homes</h1> */}
                    <img alt="logo" src={logo} onClick={this.props.homeClick}
                    height="80" width="110" className="logoImg"></img>
                </div>
                <div className="navLinks">
                    <button onClick={this.props.galleryClick} className="headerButtons">Gallery</button>
                    <button onClick={this.props.currentProjectClick} className="headerButtons">Projects</button>
                    <button onClick={this.props.aboutClick} className="headerButtons">About</button>
                    <button onClick={this.props.contactClick} className="headerButtons">Contact</button>
                </div>
            </div>
        );
    }
}

export default Header;