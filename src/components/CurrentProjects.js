import React, { Component } from "react";
import axios from 'axios';
import { API_ROOT } from '../constants';
import ProjectCardFront from './ProjectCardFront';


class CurrentProjects extends Component {
    state = {
        projects: []
    }

    componentDidMount() {
        axios.get(`${API_ROOT}/projects`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    projects: res.data
                })
            }).catch(error => alert(error));
    }

    render() {
        return (
            <div className="gallery">

                <div className="container">

                    <div className="containerEclatAbout">
                        {

                            this.state.projects.map(project => {
                                return <ProjectCardFront project={project} handleDelete={this.handleDelete} />
                            })

                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentProjects;