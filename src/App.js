import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Home from './components/Home';
import CurrentProjects from './components/CurrentProjects';
import About from './components/About';
import Contact from './components/Contact';





class App extends Component {
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
    return (
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
    )

  };
}

export default App;
