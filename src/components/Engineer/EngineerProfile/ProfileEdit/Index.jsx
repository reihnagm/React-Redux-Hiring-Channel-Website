import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import SkillsComponent from './Skills/Index';
import {
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
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import DateFnsUtils from '@date-io/date-fns';
import * as moment from 'moment';
import { connect } from 'react-redux';
import {
    getCurrentProfileEngineer,
    getSkills,
    getSkillsBasedOnProfileEngineer,
    updateProfileEngineer } from '../../../../actions/engineer';
import Spinner from '../../../Spinner/Index';
const ProfileEdit = ({
    getSkills,
    getSkillsBasedOnProfileEngineer,
    getCurrentProfileEngineer,
    updateProfileEngineer,
    engineer: { engineer, skills, skills_engineer, loading },
    auth: { user },
    history
    }) => {
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
    let birthdate = engineer.data && engineer.data.birthdate
    const [formData, setFormData] = useState({
        id: '',
        user_id: '',
        name: '',
        email: '',
        description: '',
        showcase: '',
        salary: '',
        telephone: '',
        location: '',
    });
    function phoneMask(props) {
        const { inputRef, ...other } = props;
        return (
            <MaskedInput
                {...other}
                ref={ref => {
                    inputRef(ref ? ref.inputElement : null);
                }}
                mask={['(',/[1-9]/,/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                placeholderChar={'_'}
                showMask
            />
        );
    }
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [avatar, setAvatar] = useState('');
    const [skillsMask, setSkills] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getCurrentProfileEngineer();
            await getSkills();
            if(typeof idProps === "undefined") {
                return false;
            } else {
                await getSkillsBasedOnProfileEngineer(idProps);
            }
        }
        fetchData();
        setFormData({
            id: idProps,
            name: nameProps,
            email: emailProps,
            description: descriptionProps,
            location: locationProps,
            showcase: showcaseProps,
            salary: salaryProps,
            telephone: telephoneProps
        });
        setAvatar(avatarProps);
        if(typeof birthdate === "undefined" || birthdate === "0000-00-00") {
            setSelectedDate(new Date());
        } else {
            setSelectedDate(new Date(birthdate));
        }
    },[getCurrentProfileEngineer, getSkills, getSkillsBasedOnProfileEngineer, idProps, avatarProps, nameProps, emailProps, descriptionProps, locationProps, showcaseProps, salaryProps, telephoneProps,
    birthdate]);
    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const handleDate = (value) => {
        let convertDate = moment(value).format('YYYY-MM-D');
        setSelectedDate(convertDate);
    }
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
            if(name.length < 3) {
                throw new Error('Name Minimum 3 Character.');
            }
            if(description.length < 200) {
                throw new Error('Description Minimum 200 Character.');
            }
            let data = new FormData();
            data.set('user_id', user_id);
            data.append('avatar', avatar ? avatar : '');
            data.set('avatar', avatar ? avatar : '');
            data.set('name', name ? name : '');
            data.set('email', email ? email: '');
            data.set('birthdate', selectedDate);
            data.set('description', description ? description : '');
            data.set('skills', JSON.stringify(skillsMask));
            // pake JSON.stringify ngatasin biar ngga [object object] datanya
            // ntar di JSON.parse di backend
            // kalo cek array pake 0 bukan null
            data.set('showcase', showcase ? showcase : '');
            data.set('telephone', telephone ? telephone : '');
            data.set('salary', salary ? salary : '');
            data.set('location', location ? location : '');
            const engineer_id = id;
            updateProfileEngineer(engineer_id, data);
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
                        item
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
                                disabled
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
                            <SkillsComponent skills={skills} skills_engineer={skills_engineer} skillsMask={skillsMask} setSkills={setSkills} />
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
                                    onChange={handleDate}
                                    value={selectedDate}
                                    margin="normal"
                                    inputVariant="outlined"
                                    label="Birthdate"
                                    format="yyyy-MM-d"
                                    fullWidth
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
                                InputProps={{
                                    inputComponent: phoneMask
                                }}
                            />
                            <NumberFormat
                                onChange={(e) => onChange(e)}
                                value={salary}
                                name="salary"
                                margin="normal"
                                variant="outlined"
                                label="salary"
                                decimalScale={3}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                thousandSeparator={true}
                                prefix={"Rp "}
                                customInput={TextField}
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
                                    Update Profile
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
