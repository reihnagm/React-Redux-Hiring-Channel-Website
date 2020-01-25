import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../../actions/alert';
import { getCurrentProfileCompany, updateProfileCompany } from '../../../../actions/company';
import InputMask from 'react-input-mask';
import Alert from '../../../Alert/Index';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import Spinner from '../../../Spinner/Index';
import defaultImage from '../../../../images/default.png';
import store from '../../../../store';
const ProfileEdit = ({
    getCurrentProfileCompany,
    updateProfileCompany,
    company: { company, loading },
    auth: { user },
    history }) => {
    const [loadingMask, setLoading] = useState(loading);
    let idProps = company.data && company.data.id;
    let nameProps = company.data && company.data.name;
    let logoProps = company.data && company.data.logo;
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
            setLoading(false);
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
        setLogo(logoProps);
    },[getCurrentProfileCompany, idProps, nameProps, locationProps, descriptionProps, emailProps, telephoneProps]);
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleLogo = (e) => {
        let error = false
        if(e.target.files) {
            let file = e.target.files[0]
            let size = file.size
            let extension = file.name.split('.')[1]
            try {
                if(size > 1024000) {
                    error = true;
                    throw new Error('File size cannot larger than 1MB.');
                    document.getElementById('logo').value = '';
                }
                if(!isImage(extension)) {
                    error = true;
                    throw new Error('File type allowed: PNG, JPG, JPEG, GIF, SVG, BMP.');
                    document.getElementById('logo').value = '';
                }
                if(error === false) {
                    setLogo(e.target.files[0]);
                }
            } catch(error) {
                store.dispatch(setAlert(error.message, 'danger'));
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
    let imageSource = logo ? `http://localhost:5000/images/company/${logo}` : defaultImage;
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
                history.push('/companies');
            }
        } catch (error) {
            store.dispatch(setAlert(error.message, 'danger'));
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
                           <input id='logo' type='file' onChange={e => handlelogo(e)}/>
                        </div>
                       <div className='field'>
                           <button
                               type='submit'
                               className='is-block is-rounded is-padding-small button is-info is-fullwidth'>
                               Save
                           </button>
                        </div>
                       <div className='field'>
                           <Link
                               to='/companies'
                               className='is-block is-center is-rounded is-padding-small button is-danger is-fullwidth'>
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
    { getCurrentProfileCompany, updateProfileCompany, setAlert })
    (withRouter(CompanyEdit)
);
