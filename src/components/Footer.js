import React, { Component } from "react";
import instagramLogo from '../instagram_logo.jpg'
import instagramLogo2 from '../instaLogo2.webp'

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <br></br>
                <h4>Follow us on Instagram!</h4>
                <br></br>
                <a href="https://www.instagram.com/canedobuilders/" target="_blank">
                <img alt="instagram logo" src={instagramLogo2} className="instagramLogo"></img>
                </a>
               
            </div>
        )
    }
}

export default Footer;