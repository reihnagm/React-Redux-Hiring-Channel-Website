import React, { useState } from 'react'
import Alert from './Alert'
import InputMask from 'react-input-mask'
import { Link, Redirect } from 'react-router-dom'
import dummyImg from '../../images/dummy.jpg'

import { connect } from 'react-redux'
import { updateProfileEngineer } from '../../actions/engineer'
import { logout } from '../../actions/auth'

const ProfileEngineer = ({ updateProfileEngineer, isAuthenticated, auth: { user }, logout }) => {

    let user_id = user === null ? '' : user[0].id
    let check_auth = isAuthenticated === false ? false : true

    const [formAddEngineer, setFormAddEngineer] = useState({
        description: '',
        skill: '',
        location: '',
        showcase: '',
        telephone: '',
        birthdate: '',
        salary: ''
    })

    const [avatar, setAvatar] = useState()
    const [avatarDisplay, setAvatarDisplay] = useState()

    const { description, skill, location, birthdate, showcase, email, telephone, salary } = formAddEngineer

    const onChange = e => setFormAddEngineer({ ...formAddEngineer, [e.target.name]: e.target.value })

    const onChangeAvatar = async e => {
        const files = e.target.files
        const ext = files[0].name.split('.')
        const filename = ext[ext.length - 1]
        const size = files[0].size
        if(size >= 5242880 ) {
            alert('Oops!, Size cannot more than 5MB')
            document.getElementById('avatar').value = ''
            return false
        } else if(!isImage(filename.toLowerCase())) {
            alert('Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG')
            document.getElementById('avatar').value = ''
            return false
        }
        else {
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


    const add_engineer = (event) => {
        event.preventDefault()


        const formData = new FormData()
        formData.set('description', description)
        formData.set('skill', skill)
        formData.set('location', location)
        formData.set('birthdate', birthdate)
        formData.set('showcase', showcase)
        formData.set('telephone', telephone)
        formData.set('salary', salary)
        formData.append('avatar', avatar)
        formData.set('user_id', user_id)


        updateProfileEngineer(126, formData)

        return <Redirect to='/' />
    }


    // if(!check_auth) {
    //     return <Redirect to='/' />
    // }

    return (
        <div className='has-small-vm'>

            <header className='navbar has-small-vm'>
                <div className='column'>
                    <img src='' alt='Logo' />
                </div>
                <div id='navbar' className='column is-half'>
                    <Link to='/'>Home</Link> |
                    <Link to='/engineer/profile'>Engineers</Link> |
                    <Link to='/companies'>Companies</Link> |
                    <a id='logout' onClick={logout}>Logout</a>
                </div>
            </header>

            <div className='columns is-justify-center'>
                <div className='column is-half'>
                    <div className='cards'>
                        <h3 id='title-add-engineer'>Update Engineer</h3>
                        <form onSubmit={ e => add_engineer(e) }>
                            <div className='field'>
                                <textarea onChange={e => onChange(e)} value={description} name='description' placeholder='Description'></textarea>
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={skill} type='text' name='skill' placeholder='Skill'></input>
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={location} type='text' name='location' placeholder='Location'></input>
                            </div>
                            <div className='field'>
                                <InputMask name='birthdate' onChange={e => onChange(e)} type='text' mask="9999-99-99" value={birthdate} placeholder='Birthdate'  />
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={showcase} type='text' name='showcase' placeholder='Showcase'></input>
                            </div>
                            <div className='field'>
                                <InputMask name='telephone' onChange={e => onChange(e)} type='text' mask="9999-9999-9999" value={telephone} placeholder='Enter phone number' />
                            </div>
                            <div className='field'>
                                <InputMask onChange={e => onChange(e)} name='salary' type='text' mask="99.999.999" value={salary} placeholder='Salary' />
                            </div>
                            <div className='field'>
                                <img src={avatar} alt='tets' />
                                <input id='avatar' onChange={e => onChangeAvatar(e)} type='file' name='avatar'></input>
                            </div>
                            <div className='field'>
                                <button type='submit' className='is-block is-rounded is-padding-small button is-info is-fullwidth'> Submit </button>
                            </div>
                            <div className='field'>
                                <Link to='/engineers' className='is-block is-center is-rounded is-padding-small button is-danger is-fullwidth'> Back </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect( mapStateToProps, {updateProfileEngineer, logout })(ProfileEngineer)
