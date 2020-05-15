import React, { Component, Fragment } from "react";
import axios from 'axios';
import { API_ROOT } from '../constants';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProjectCard from './ProjectCard';


class CurrentProjectsAdmin extends Component {
    state = {
        form: false,
        address: "",
        beds: "",
        baths: "",
        completionDate: "",
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

    handleNewClick = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                form: !prevState.form
            }
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('address', this.state.address);
        fd.append('beds', this.state.beds);
        fd.append('baths', this.state.baths);
        fd.append('completion_date', this.state.completionDate);
        fd.append('user_id', this.props.user.currentUser.id);
        axios.post(`${API_ROOT}/newProject`, fd)
            .then(res => {
                console.log(res.data);
                alert('New project created.')
                this.setState(prevState => {
                    return {
                        projects: [...prevState.projects, res.data],
                        address: "",
                        beds: "",
                        baths: "",
                        completionDate: "",
                    }
                })
            }).catch(error => alert(error));
    }

    handleDelete = (id) => {
        const fd = new FormData();
        console.log(id);
        fd.append('id', id);
        axios.post(`${API_ROOT}/deleteProject`, fd)
            .then(res => {
                console.log(res.data);
                alert('Project succesfully deleted');
                const project = this.state.projects.find(p => {
                    return p.id === res.data.id
                });
                const newArray = this.state.projects.filter(p => p.id !== project.id);
                this.setState(prevState => {
                    return {
                        projects: newArray
                    }
                })
            }).catch(error => alert(error));
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Current Projects</h1>
                    <div className="newProjectForm">
                        {
                            this.state.form ?
                                <Fragment>
                                    <Form>
                                        <Form.Group controlId="formGridAddress1">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control placeholder="1234 Main St"
                                                value={this.state.address} name="address" onChange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Row>
                                            <Form.Group controlId="formGridEmail">
                                                <Form.Label>Bedrooms</Form.Label>
                                                <Form.Control type="text" placeholder="Enter # beds"
                                                    value={this.state.beds} name="beds" onChange={this.handleChange} />
                                            </Form.Group>

                                            <Form.Group controlId="formGridPassword">
                                                <Form.Label>Bathrooms</Form.Label>
                                                <Form.Control type="text" placeholder="Enter # baths"
                                                    value={this.state.baths} name="baths" onChange={this.handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group controlId="formGridCity">
                                                <Form.Label>Completion Date</Form.Label>
                                                <Form.Control type="text" placeholder="11/15/2020"
                                                    value={this.state.completionDate} name="completionDate" onChange={this.handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                        
                                        <Button variant="dark" onClick={this.handleNewClick}>Cancel</Button>
                                        <Button variant="primary" type="submit" onClick={this.handleSubmit} className="buttonMargin">
                                            Submit
                                        </Button>
                                    </Form>

                                </Fragment>
                                :
                                <Button variant="dark" onClick={this.handleNewClick}>New Project</Button>
                        }
                        <div className="projects">
                            {
                                this.state.projects.map(project => {
                                    return <ProjectCard project={project} handleDelete={this.handleDelete}/>
                                })
                            }
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

export default connect(mapStateToProps, null)(CurrentProjectsAdmin);
