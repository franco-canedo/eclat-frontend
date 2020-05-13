import React, { Component } from "react";
import Header from '../adminComponents/HeaderAdmin';
import Gallery from '../adminComponents/GalleryAdmin';
import Home from '../adminComponents/HomeAdmin';
import CurrentProjects from '../adminComponents/CurrentProjectsAdmin';
import About from '../adminComponents/AboutAdmin';
import Contact from '../adminComponents/ContactAdmin';

import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { getProfileFetch } from '../actions';

class Administrator extends Component {
    constructor() {
        super();
        this.state = {
            page: "Home"
        }
    }

    handleHomeClick = () => {
        this.setState({
            page: "Home"
        })
    }

    handleGalleryClick = (e) => {
        e.preventDefault();
        console.log('Gallery?')
        this.setState({
            page: "Gallery"
        })
    }

    handleCurrentProjectClick = () => {
        this.setState({
            page: "CurrentProject"
        })
    }

    handleAboutClick = () => {
        this.setState({
            page: "About"
        })
    }

    handleContactClick = () => {
        this.setState({
            page: "Contact"
        })
    }
    render() {
        return  this.props.isLogged ? (
            <div className="App">
                <Header galleryClick={this.handleGalleryClick}
                    currentProjectClick={this.handleCurrentProjectClick}
                    aboutClick={this.handleAboutClick}
                    contactClick={this.handleContactClick}
                    homeClick={this.handleHomeClick}
                />
                {
                    this.state.page === "Home" ? <Home /> :
                        this.state.page === "Gallery" ? <Gallery /> :
                            this.state.page === "CurrentProject" ? <CurrentProjects /> :
                                this.state.page === "About" ? <About /> :
                                    this.state.page === "Contact" ? <Contact /> : null
                }

            </div>
        ) : (
            <Redirect to="/admin" />
          );
    }
}

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch())
  
  })
  
  const mapStateToProps = state => {
    return {
      currentUser: state.currentUser,
      isLogged: state.isLogged
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);
