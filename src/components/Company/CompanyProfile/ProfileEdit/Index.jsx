import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfileCompany, updateProfileCompany } from '../../../../actions/company';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';
import Alert from '../../../Alert/Index';
import Spinner from '../../../Spinner/Index';
const ProfileEdit = ({
    getCurrentProfileCompany,
    updateProfileCompany,
    company: { company, loading },
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
    const [loadingMask, setLoading] = useState(loading);
    let idProps = company.data && company.data.id;
    let nameProps = company.data && company.data.name;
    let locationProps = company.data && company.data.location;
    let descriptionProps = company.data && company.data.description;
    let emailProps = company.data && company.data.email;
    let telephoneProps = company.data && company.data.telephone;
    let user_id = user.data && user.data.id;
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        location: '',
        description: '',
        email: '',
        telephone: '',
    });
    const [logo, setLogo] = useState('');
    useEffect(() => {
        const _fetchData = async () => {
            await getCurrentProfileCompany();
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
        _fetchData();
        setFormData({
            id: idProps,
            name: nameProps,
            location: locationProps,
            description: descriptionProps,
            email: emailProps,
            telephone: telephoneProps
        });
    },[getCurrentProfileCompany, idProps, nameProps, locationProps, descriptionProps, emailProps, telephoneProps]);
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleLogo = (e) => {
        let error = false
        if(e.target.files) {
            let size = e.target.files[0].size
            let extension = e.target.files[0].name.split('.')[1]
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
                    setLogo(e.target.files[0]);
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
    const { id, name, location, description, email, telephone} = formData;
    const submitProfile = (e) => {
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
                    error = true
                    throw new Error('Description Minimum 10 Character.');
                }
            }
            if(error === false) {
                let data = new FormData();
                data.set('user_id', user_id);
                data.set('name', name ? name : '');
                data.append('logo', logo ? logo : '');
                data.set('logo', logo ? logo : '');
                data.set('location', location ? location : '');
                data.set('description', description ? description : '');
                data.set('email', email ? email: '');
                data.set('telephone', telephone ? telephone : '');
                updateProfileCompany(id, data);
                setTimeout(() => {
                    history.push('/companies');
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
                   <h3 id='title-edit-company'>Edit Profile</h3>
                   <form onSubmit={e => submitProfile(e)}>
                       <div className='field'>
                           <label> Name </label>
                           <input
                               onChange={e => onChange(e)}
                               value={name}
                               name='name'
                               type='text'
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
                           <label> Telephone </label>
                           <InputMask
                               onChange={e => onChange(e)}
                               value={telephone}
                               name='telephone'
                               type='text'
                               placeholder='Enter phone number'
                           />
                        </div>
                        <div className='field'>
                           <label> Logo </label>
                           <input id='logo' type='file' onChange={e => handleLogo(e)}/>
                        </div>
                       <div className='field'>
                           <button
                               type='submit'
                               className='is-block is-center is-rounded button is-fullwidth'>
                               Save
                           </button>
                        </div>
                       <div className='field'>
                           <Link
                               to='/companies'
                               className='is-block is-center is-rounded button is-fullwidth'>
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
    company: state.company,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { getCurrentProfileCompany, updateProfileCompany }
)(withRouter(ProfileEdit));
