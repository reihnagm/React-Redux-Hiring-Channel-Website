import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    CssBaseline,
    Container,
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import * as moment from 'moment';
import { connect } from 'react-redux';
import {
    getCurrentProfileEngineer,
    getSkills,
    getSkillsBasedOnProfileEngineer,
    updateProfileEngineer } from '../../../../actions/engineer';
import Spinner from '../../../Spinner/Index';
// import { useForm } from 'react-hook-form'; belum nyoba pake
const ProfileEdit = ({
    getSkills,
    getSkillsBasedOnProfileEngineer,
    deleteSkillId,
    getCurrentProfileEngineer,
    updateProfileEngineer,
    engineer: { engineer, skills, skills_engineer, loading },
    auth: { user },
    history }) => {
    const Toast = Swal.mixin({
        position: 'top-end',
        toast: true,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: false,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    let birthdate = engineer.data && engineer.data.birthdate;
    let idProps = engineer.data && engineer.data.id;
    let avatarProps = engineer.data && engineer.data.avatar;
    let nameProps = engineer.data && engineer.data.name;
    let emailProps = engineer.data && engineer.data.email;
    let descriptionProps = engineer.data && engineer.data.description;
    let telephoneProps = engineer.data && engineer.data.telephone;
    let showcaseProps = engineer.data && engineer.data.showcase;
    let salaryProps = engineer.data && engineer.data.salary;
    let locationProps = engineer.data && engineer.data.location;
    let user_id = user.data && user.data.id;
    const [formData, setFormData] = useState({
        id: '',
        user_id: '',
        name: '',
        email: '',
        description: '',
        showcase: '',
        telephone: '',
        salary: '',
        location: '',
    });
    const [skillsMask, setSkills] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        // register({ name: "array" });
        const _fetchData = async () => {
            await getCurrentProfileEngineer();
        }
        const _fetchSkills = async () => {
            await getSkills();
        }
        const _fetchSkillsBasedOnProfileEngineer = async () => {
            if(typeof idProps === "undefined") {
                return false;
            } else {
                await getSkillsBasedOnProfileEngineer(idProps);
            }
        }
        _fetchSkillsBasedOnProfileEngineer();
        _fetchSkills();
        _fetchData();
        setFormData({
            id: idProps,
            name: nameProps,
            email: emailProps,
            description: descriptionProps,
            location: locationProps,
            showcase: showcaseProps,
            telephone: telephoneProps,
            salary: salaryProps,
        });
        setAvatar(avatarProps);
        const _checkBirthdate = (birthdate) => {
            if(typeof birthdate === "undefined") {
                return false;
            } else {
                let convertDate = moment(birthdate).format('YYYY-MM-D');
                setSelectedDate(convertDate);
            }
        }
        _checkBirthdate(birthdate);
    },[getCurrentProfileEngineer, getSkills, getSkillsBasedOnProfileEngineer, idProps, birthdate, avatarProps, nameProps, emailProps, descriptionProps, locationProps, showcaseProps, telephoneProps, salaryProps]);
    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const handleDate = (value) => {
        let convertDate = moment(value).format('YYYY-MM-D');
        setSelectedDate(convertDate);
    }
    // const valHtml = val.map((option, index) => {
    //     return (
    //         <Chip
    //             key={option.id}
    //             label={option.name}
    //             onDelete={() => {
    //                 setVal(val.filter(entry => entry !== option))
    //                 let engineer_id = id;
    //                 let skill_id = option.id;
    //                 deleteSkillId(skill_id, engineer_id);
    //             }}
    //         />
    //     )
    // }) // jadi chipnya disini di forloop
    const handleAvatar = (e) => {
        let error = false;
        if(e.target.files) {
            let size = e.target.files[0].size;
            let extension = e.target.files[0].name.split('.')[1];
            try {
                if(size > 1024000) {
                    error = true;
                    throw new Error('File size cannot larger than 1MB.');
                }
                if(!isImage(extension)) {
                    error = true;
                    throw new Error('File type allowed: PNG, JPG, JPEG, GIF, SVG, BMP.');
                }
                if(error === false) {
                    setAvatar(e.target.files[0]);
                }
            } catch(error) {
                Toast.fire({
                    icon: 'error',
                    title: error.message
                });
            }
            function isImage(extension) {
                switch (extension) {
                    case 'png':
                    case 'jpg':
                    case 'jpeg':
                    case 'gif':
                    case 'svg':
                    case 'bmp':
                        return true;
                    default:
                }
                return false;
            }
        }
    }
    const { id, name, email, description, showcase, telephone, salary, location } = formData;
    const onSubmit = (event) => {
        event.preventDefault();
        try {
            if(name === null || name.trim() === "") {
                throw new Error('name required.');
            }
            if(description === null || description.trim() === "") {
                throw new Error('description required.');
            }
            if(name) {
                if(name.length < 3) {
                    throw new Error('name minimum 3 character length.');
                }
            }
            // if(description) {
            //     if(description.length > 200) {
            //         throw new Error('description maximum 200 character length.');
            //     }
            // }
            let data = new FormData();
            data.set('user_id', user_id);
            data.append('avatar', avatar ? avatar : '');
            data.set('avatar', avatar ? avatar : '');
            data.set('name', name ? name : '');
            data.set('email', email ? email: '');
            data.set('birthdate', selectedDate);
            data.set('description', description ? description : '');
            data.set('skills', skillsMask.length === 0 ? JSON.stringify(skills_engineer) : JSON.stringify(skillsMask));
            // pake JSON.stringify ngatasin biar ngga [object object] datanya
            // ntar di JSON.parse di backend
            // kalo cek array pake 0 bukan null
            data.set('showcase', showcase ? showcase : '');
            data.set('telephone', telephone ? telephone : '');
            data.set('salary', salary ? salary : '');
            data.set('location', location ? location : '');
            updateProfileEngineer(id, data);
            setTimeout(() => {
                history.push('/engineers');
                Toast.fire({
                    icon: 'success',
                    title: 'Yay ! Profile Updated.'
                });
            }, 1000);
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: error.message
            });
        }
    }
    return loading ? ( <Spinner /> ) : (
        <>
            <Container fixed>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        container
                        md={8}
                        xs={12}
                    >
                        <form onSubmit={(event) => onSubmit(event)}>
                           <TextField
                                onChange={onChange}
                                value={name}
                                name="name"
                                margin="normal"
                                variant="outlined"
                                label="Name"
                                fullWidth
                            />
                            <TextField
                                onChange={onChange}
                                value={email}
                                name="email"
                                margin="normal"
                                variant="outlined"
                                label="E-mail Address"
                                fullWidth
                             />
                            <TextField
                                onChange={onChange}
                                value={description}
                                multiline
                                rows="4"
                                name="description"
                                margin="normal"
                                variant="outlined"
                                label="Description"
                                fullWidth
                            />
                            <Autocomplete
                                multiple
                                filterSelectedOptions
                                defaultValue={skills_engineer}
                                options={skills}
                                onChange={(event, getSkills) => {
                                    setSkills(getSkills);
                                }}
                                getOptionLabel={skills => skills.name}
                                getOptionSelected={(option, value) => {
                                    return option.id === value.id
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        variant="outlined"
                                        label="Skills"
                                        fullWidth
                                    />
                                )}
                            />
                            <TextField
                                onChange={e => onChange(e)}
                                value={location}
                                name="location"
                                margin="normal"
                                variant="outlined"
                                label="Location"
                                fullWidth
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    variant="outlined"
                                    format="yyyy/MM/dd"
                                    value={selectedDate}
                                    onChange={handleDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                onChange={e => onChange(e)}
                                value={showcase}
                                name="showcase"
                                margin="normal"
                                variant="outlined"
                                label="Showcase"
                                fullWidth
                            />
                            <TextField
                                onChange={e => onChange(e)}
                                value={telephone}
                                name="telephone"
                                margin="normal"
                                variant="outlined"
                                label="Telephone"
                                fullWidth
                            />
                            <TextField
                                onChange={e => onChange(e)}
                                value={salary}
                                name="salary"
                                margin="normal"
                                variant="outlined"
                                label="Salary"
                                fullWidth
                            />
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Button type="button" variant="contained" color="primary" component={ Link } to="/engineers">
                                    Back
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    Save
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
const mapStateToProps = state => ({
    engineer: state.engineer,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { getCurrentProfileEngineer, getSkills, getSkillsBasedOnProfileEngineer, updateProfileEngineer }
)(withRouter(ProfileEdit));
