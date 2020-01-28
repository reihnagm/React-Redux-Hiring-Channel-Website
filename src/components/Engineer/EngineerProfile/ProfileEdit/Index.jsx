import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { getCurrentProfileEngineer, updateProfileEngineer } from '../../../../actions/engineer';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers'
import InputMask from 'react-input-mask';
import Alert from '../../../Alert/Index';
import Moment from 'react-moment';
import Spinner from '../../../Spinner/Index';
import defaultImage from '../../../../images/default.png';
import store from '../../../../store';
const ProfileEdit = ({
    getCurrentProfileEngineer,
    updateProfileEngineer,
    engineer: { engineer, loading },
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
    const [selectedDate, handleDateChange] = useState(new Date());
    const [loadingMask, setLoading] = useState(loading);
    let idProps = engineer.data && engineer.data.id;
    let avatarProps = engineer.data && engineer.data.avatar;
    let nameProps = engineer.data && engineer.data.name;
    let emailProps = engineer.data && engineer.data.email;
    let descriptionProps = engineer.data && engineer.data.description;
    let skillProps = engineer.data && engineer.data.skill;
    let birthdateProps = engineer.data && engineer.data.birthdate;
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
        skill: '',
        showcase: '',
        telephone: '',
        salary: '',
        location: '',
    });
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        const _fetchData = async () => {
            await getCurrentProfileEngineer();
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
        _fetchData();
        setFormData({
            id: idProps,
            name: nameProps,
            email: emailProps,
            description: descriptionProps,
            skill: skillProps,
            location: locationProps,
            showcase: showcaseProps,
            telephone: telephoneProps,
            salary: salaryProps,
        });
        setAvatar(avatarProps);
    },[getCurrentProfileEngineer, idProps, avatarProps, nameProps, emailProps, descriptionProps, skillProps, locationProps, showcaseProps, telephoneProps, salaryProps, locationProps]);
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    document.getElementById('avatar').value = '';
                }
                if(!isImage(extension)) {
                    error = true;
                    throw new Error('File type allowed: PNG, JPG, JPEG, GIF, SVG, BMP.');
                    document.getElementById('avatar').value = '';
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
    const { id, name, email, description, skill, showcase, telephone, salary, location, redirect } = formData;
    let imageSource = avatar ? `http://localhost:5000/images/engineer/${avatar}` : defaultImage;
    const submitProfile = (e) => {
         let date = selectedDate.getUTCFullYear() + '-' + ('00' + (selectedDate.getUTCMonth()+1)).slice(-2) + '-' + ('00' + selectedDate.getUTCDate()).slice(-2);
        e.preventDefault();
        let error = false;
        try {
            if(name === null || name.trim() === "") {
                error = true;
                throw new Error('Name Required.');
            }
            if(description === null || description.trim() === "") {
                error = true;
                throw new Error('Description Required.');
            }
            if(name) {
                if(name.length < 3) {
                    error = true;
                    throw new Error('Name Minimum 3 Character.');
                }
            }
            if(description) {
                if(description.length < 10) {
                    error = true;
                    throw new Error('Description Minimum 10 Character.');
                }
            }
            if(error === false) {
                let data = new FormData();
                data.set('user_id', user_id);
                data.append('avatar', avatar ? avatar : '');
                data.set('avatar', avatar ? avatar : '');
                data.set('name', name ? name : '');
                data.set('email', email ? email: '');
                data.set('birthdate', date ? date : birthdateProps);
                data.set('description', description ? description : '');
                data.set('skill', skill ? skill : '');
                data.set('showcase', showcase ? showcase : '');
                data.set('telephone', telephone ? telephone : '');
                data.set('salary', salary ? salary : '');
                data.set('location', location ? location : '');
                updateProfileEngineer(id, data);
                setTimeout(() => {
                    history.push('/engineers');
                    Toast.fire({
                        icon: 'success',
                        title: 'Yay !, Profile Updated.'
                    });
                }, 800);
            }
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: error.message
            });
        }
    }
    return loadingMask ? ( <Spinner /> ) : (
        <div className='columns is-justify-center'>
           <div className='column is-half'>
                <Alert />
                <br />
               <div className='cards'>
                   <h3 id='title-edit-engineer'>Edit Profile</h3>
                   <form onSubmit={e => submitProfile(e)}>
                       <div className='field'>
                           <label> Name </label>
                           <input
                                onChange={e => onChange(e)}
                                value={name}
                                type='text'
                                name='name'
                                placeholder='Name'>
                           </input>
                       </div>
                       <div className='field'>
                           <label> E-mail Address </label>
                           <input
                                disabled
                                value={email}
                                name='email'
                                type='text'
                                placeholder='E-mail Address'>
                           </input>
                       </div>
                       <div className='field'>
                           <label> Description </label>
                           <textarea
                                onChange={e => onChange(e)}
                                value={description}
                                name='description'
                                placeholder='Description'>
                           </textarea>
                       </div>
                       <div className='field'>
                           <label> Skill </label>
                           <input
                                onChange={e => onChange(e)}
                                value={skill}
                                type='text'
                                name='skill'
                                placeholder='Skill'>
                           </input>
                       </div>
                       <div className='field'>
                           <label> Location </label>
                           <input
                                onChange={e => onChange(e)}
                                value={location}
                                type='text'
                                name='location'
                                placeholder='Location'>
                           </input>
                       </div>
                       <div className='field'>
                            <label> Birthdate </label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker value={selectedDate} onChange={handleDateChange} />
                            </MuiPickersUtilsProvider>
                       </div>
                       <div className='field'>
                            <label> Showcase </label>
                            <input
                                onChange={e => onChange(e)}
                                value={showcase}
                                type='text'
                                name='showcase'
                                placeholder='http://johndoe.com/showcase'>
                           </input>
                       </div>
                       <div className='field'>
                            <label> Telephone </label>
                            <InputMask
                                onChange={e => onChange(e)}
                                value={telephone}
                                type='text'
                                name='telephone'
                                placeholder='Enter phone number'
                           />
                       </div>
                        <div className='field'>
                            <label> Avatar </label>
                            <input id='avatar' type='file' onChange={e => handleAvatar(e)}/>
                       </div>
                       <div className='field'>
                           <label> Salary </label>
                           <InputMask
                                onChange={e => onChange(e)}
                                value={salary}
                                type='text'
                                name='salary'
                                placeholder='Salary'
                           />
                       </div>
                       <div className='field'>
                           <button
                               type='submit'
                               className='is-block is-rounded button is-fullwidth'>
                               Save
                           </button>
                       </div>
                       <div className='field'>
                           <Link
                               to='/engineers'
                               className='is-block is-center button is-rounded is-fullwidth'>
                               Back
                           </Link>
                       </div>
                   </form>
               </div>
           </div>
       </div>
    )
}
const mapStateToProps = state => ({
    engineer: state.engineer,
    auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfileEngineer, updateProfileEngineer })(withRouter(ProfileEdit))
