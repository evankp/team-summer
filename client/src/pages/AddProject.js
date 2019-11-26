import React, { Component } from 'react';
import { withStyles, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { CustomOutlinedInput, OutlinedSelect, handleSelect } from '../components/Inputs';
import UploadImages from '../components/UploadImages';
import FormValidator from '../helpers/form-validation';
import { withToast } from '../components/Toast';
import { addProject } from '../api/projects';

const styles = {
    pageContent: {
        display: 'flex',
        justifyContent: 'center'
    },
    projectPreview: {
        margin: "10px"
    },
    addProjectPage: {
        margin: "10px"
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        width: '100%'
    },
}

const industries = [
    { id: 0, name: '' },
    { id: 1321, name: 'Technology' },
    { id: 21423, name: 'Marketing' },
    { id: 42342, name: 'Engineering' },
    { id: 21342, name: 'Art' },
    { id: 93082, name: 'Film' }
]

const locations = [
    { id: 0, name: '' },
    { id: 123, name: 'New York' },
    { id: 431, name: 'California' },
    { id: 903, name: 'Georgia' },
    { id: 223, name: 'Florida' }
]

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.validators = FormValidator([
            {
                field: 'title',
                method: validator.isEmpty,
                validWhen: false,
                message: 'Title is required.'
            },
            {
                field: 'industry',
                method: validator.isEmpty,
                validWhen: false,
                message: 'Industry is required'
            },
            {
                field: 'location',
                method: validator.isEmpty,
                validWhen: false,
                message: 'location is required'
            },
            {
                field: 'fundingGoal',
                method: validator.isNumeric,
                validWhen: true,
            }
        ]);
        this.state = {
            uploading: false,
            title: '',
            subtitle: '',
            industry: '',
            location: '',
            images: [],
            fundingGoal: 0,
            formData: {},
            validation: this.validators.valid()
        }
    }

    componentDidMount() {
        this.setState({ formData: new FormData() })
    }

    handleInput = (event) => {
        const { value, name } = event.target;
        const { formData } = this.state;
        formData.set(name, value);
        this.setState({ [name]: value, formData })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const validation = this.validators.validate(this.state);
        this.setState({ validation });

        if (validation.isValid) {
            const { title, subtitle, industry, location, images, fundingGoal } = this.state;
            // const formData = { title, subtitle, industry, location, images, fundingGoal }
            const { formData } = this.state;
            const id = '5ddc10c981160d471cc4918e';
            const newProject = await addProject(id, formData);
            console.log('newProject', newProject);
        }
        // console.log(this.state)
        // for (const pair of this.state.formData.entries()) {
        //     console.log(pair[0], pair[1])
        // }
    }

    setImages = (newImages) => {
        const { formData } = this.state;
        const addImage = [...this.state.images, ...newImages];
        formData.append('images', addImage);
        this.setState({ images: addImage });
    }

    disableSubmit = () => {
        const { title, industry, location } = this.state;

        return [title, industry, location].some((value) => !value);
    };

    render() {
        const { classes } = this.props;
        const { title, subtitle, industry, location, images, fundingGoal, validation } = this.state;
        return (
            <main className={classes.pageContent}>
                {/* <div className={classes.projectPreview}>
                    <h2>Product Preview Thing</h2>
                    <Button type="submit" variant="contained" color="primary" >
                        Preview
                    </Button>
                </div> */}
                <div className={classes.addProjectPage}>
                    <h2>Start with basics</h2>
                    <form className={classes.form} onSubmit={this.handleSubmit} >
                        <h3>Title</h3>
                        <TextField
                            name="title"
                            value={title}
                            onChange={this.handleInput}
                            type="title"
                            variant="outlined"
                            required
                            error={validation.title.isInvalid}
                            helperText={validation.title.message}
                        />
                        <h3>Subtitle</h3>
                        <TextField
                            name="subtitle"
                            value={subtitle}
                            onChange={this.handleInput}
                            type="subtitle"
                            variant="outlined"
                        />
                        <h3>Industry</h3>
                        <OutlinedSelect
                            name="industry"
                            selectId="industry"
                            setState={this.handleInput}
                            selectName="industry"
                            value={industry}
                        >
                            {
                                industries.map(industry => {
                                    return (
                                        <option
                                            key={industry.id}
                                            value={industry.name}
                                        >
                                            {industry.name}
                                        </option>
                                    )
                                })
                            }
                        </OutlinedSelect>
                        <h3>Project Location</h3>
                        <OutlinedSelect
                            name="location"
                            selectId="location"
                            setState={this.handleInput}
                            selectName="location"
                            value={location}
                        >
                            {
                                locations.map(location => {
                                    return (
                                        <option
                                            key={location.id}
                                            value={location.name}
                                        >
                                            {location.name}
                                        </option>
                                    )
                                })
                            }
                        </OutlinedSelect>
                        <UploadImages setImages={this.setImages} images={images} />
                        <h3>Funding goal amount</h3>
                        <TextField
                            name="fundingGoal"
                            value={fundingGoal}
                            onChange={this.handleInput}
                            type="fundingGoal"
                            variant="outlined"
                            error={validation.fundingGoal.isInvalid}
                            helperText={validation.fundingGoal.message}
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={this.disableSubmit()}>
                            Submit
                        </Button>
                    </form>
                </div>
            </main>
        )
    }
}

export default withToast(withStyles(styles)(AddProject));