import React, { Fragment, useState, useEffect } from 'react'
import InputMask from 'react-input-mask'
import DatePicker from 'react-datepicker'
import Moment from 'react-moment'
import 'react-datepicker/dist/react-datepicker.css'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateProfileEngineer, getCurrentProfileEngineer } from '../../actions/engineer'

const UpdateProfileEngineer = ({ updateProfileEngineer, getCurrentProfileEngineer, history }, props) => {

    console.log(props)

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        description: '',
        birthdate: new Date(),
        showcase: '',
        telephone: '',
        skill: '',
        salary: '',
        location: ''
    })

    const onChangeAvatar = (event) => {
        const files = event.target.files
        const extension = files[0].name.split('.')
        const filename = extension[extension.length - 1]
        const size = files[0].size
        if(size >= 5242880 ) {
            alert('Oops!, Size cannot more than 5MB')
            document.getElementById('avatar').value = ''
            return false
        } else if(!isImage(filename.toLowerCase())) {
            alert('Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG')
            document.getElementById('avatar').value = ''
            return false
        } else {
            setAvatar(files[0])
        }
    }
    function isImage(filename) {
        switch (filename) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                  return true
            }
            return false
    }

    const [avatar, setAvatar] = useState()
    const [birthdate, setBirthdate] = useState(new Date())
    const onChangeBirthdate = (value) => {
        setBirthdate(value)
    }

    useEffect(() => {

        // setFormData({
        //     id: !item ? '' : item.id,
        //     name: !item ? '' : item.name,
        //     email: !item ? '' : item.email,
        //     description: !item ? '' : item.description,
        //     skill: !item ? '' : item.skill,
        //     telephone: !item ? '' : item.telephone,
        //     salary: !item ? '' : item.salary,
        //     showcase: !item ? '' : item.showcase,
        //     location: !item ? '' : item.location
        // })
        //
        // setAvatar(!item ? '' : item.avatar)

    },[])

    const { id, name, email, description, skill, telephone, salary, showcase, location } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const data = {
        avatar,
        name,
        description,
        skill,
        telephone,
        birthdate,
        salary,
        showcase,
        location
    }

    const updateEngineer = (event) => {
        event.preventDefault()

        let formData = new FormData()
        formData.set('name', name)
        formData.set('description', description)
        formData.set('skill', skill)
        formData.set('telephone', telephone)
        formData.set('salary', salary)
        formData.set('showcase', showcase)
        formData.set('location', location)
        formData.append('avatar', avatar)
        formData.set('user_id', 49)

        updateProfileEngineer(128, formData, history)
    }

    return (
        <Fragment>
            <div className='columns is-justify-center'>
                <div className='column is-half'>
                    <div className='cards'>
                        <h3 id='title-update-engineer'>Update Engineer</h3>
                        <form onSubmit={ e => updateEngineer(e) }>
                            <div className='field'>
                                <label> Name </label>
                                <input
                                    onChange={e => onChange(e)}
                                    value={name}
                                    name='name'
                                    placeholder='Name'>
                                </input>
                            </div>
                            <div className='field'>
                                <label> E-mail Address </label>
                                <input
                                    disabled
                                    onChange={e => onChange(e)}
                                    value={email}
                                    name='email'
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
                                <DatePicker
                                    onChange={e => onChangeBirthdate(e)}
                                    selected={birthdate}
                                    dateFormat='yyyy-MM-dd'
                                 />
                            </div>
                            <div className='field'>
                                <label> Showcase </label>
                                <input
                                    onChange={e => onChange(e)}
                                    value={showcase}
                                    type='text'
                                    name='showcase'
                                    placeholder='Showcase'>
                                </input>
                            </div>
                            <div className='field'>
                                <label> Telephone </label>
                                <InputMask
                                    onChange={e => onChange(e)}
                                    name='telephone'
                                    type='text'
                                    value={telephone}
                                    placeholder='Enter phone number'
                                />
                            </div>
                            <div className='field'>
                                <label> Avatar </label>
                                <img style={{ display:'block', margin: '30px auto', width: '120px' }} src={avatar} />
                                <input id='avatar' type='file' onChange={e => onChangeAvatar(e)}/>
                            </div>
                            <div className='field'>
                                <label> Salary </label>
                                <InputMask
                                    onChange={e => onChange(e)}
                                    value={salary}
                                    name='salary'
                                    type='text'
                                    placeholder='Salary'
                                />
                            </div>
                            <div className='field'>
                                <button
                                    type='submit'
                                    className='is-block is-rounded is-padding-small button is-info is-fullwidth'>
                                    Submit
                                </button>
                            </div>
                            <div className='field'>
                                <Link
                                    to='/engineers'
                                    className='is-block is-center is-rounded is-padding-small button is-danger is-fullwidth'>
                                    Back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    engineer: state.engineer,
    auth: state.auth
})

export default connect(mapStateToProps, { updateProfileEngineer, getCurrentProfileEngineer })(withRouter(UpdateProfileEngineer))
