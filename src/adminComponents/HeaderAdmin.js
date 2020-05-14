import React, { Component } from "react";
import { connect } from 'react-redux';
import { logoutUser, loggedOut } from '../actions';


class HeaderAdmin extends Component {
    handleClick = event => {
        event.preventDefault()
        // Remove the token from localStorage
        localStorage.removeItem("token")
        // Remove the user object from the Redux store
        this.props.logoutUser()
        this.props.loggedOut()
        alert('You have logged out, redirecting');
      }

    render() {
        return (
            <div className="header">
                <div className="Elogo">
                    <h1 onClick={this.props.homeClick}>Administrator</h1>
                </div>
                <div className="navLinksAdmin">
                    <button onClick={this.props.galleryClick} className="headerButtonsAdmin">Gallery</button>
                    <button onClick={this.props.currentProjectClick} className="headerButtonsAdmin">Projects</button>
                    <button onClick={this.props.aboutClick} className="headerButtonsAdmin">About</button>
                    <button onClick={this.props.contactClick} className="headerButtonsAdmin">Contact</button>
                    <button onClick={this.handleClick} className="headerButtonsAdmin">Log Out</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogged: state.isLogged
  })
  
  const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    loggedOut: () => dispatch(loggedOut())
  })
  
export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
