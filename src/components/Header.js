import React, { Component, Fragment } from "react";


class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="Elogo">
                    <h1 onClick={this.props.homeClick}>Eclat Homes</h1>
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