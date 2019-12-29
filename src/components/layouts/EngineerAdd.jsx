import React, { useState } from 'react'
import Alert from './Alert'
import InputMask from 'react-input-mask'
import { Link, Redirect } from 'react-router-dom'
import logo from './logo.png'
import { connect } from 'react-redux'
import { addEngineer } from '../../actions/engineer'
import { logout } from '../../actions/auth'

const EngineerAdd = ({ addEngineer, isAuthenticated, auth: { user }, logout }) => {

    let user_id = user === null ? '' : user[0].id
    let check_auth = isAuthenticated === false ? false : true

    console.log(isAuthenticated)

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

    const {description,skill,location,birthdate,showcase,email,telephone,salary} = formAddEngineer

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
            const formData = new FormData()
            formData.append('file', files[0])
            formData.append('upload_preset', 'reihanagam')

            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dilzovvfk/image/upload', {
                    method: 'POST',
                    body: formData
                })
                const file = await response.json()
                console.log(file)
                setAvatar(file.secure_url)
            } catch(error) {
                alert(error)
            }
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


    const add_engineer = (e) => {

        const data = {
            description,
            skill,
            location,
            birthdate,
            showcase,
            email,
            telephone,
            salary,
            avatar,
            user_id
        }

        e.preventDefault()
        addEngineer(data)
    }


    if(!check_auth) {
        return <Redirect to='/' />
    }

    return (
        <div className='has-small-vm'>

            <header className='navbar has-small-vm'>
                <div className='column'>
                    <img src={logo} alt='Logo' />
                </div>
                <div id='navbar' className='column is-half'>
                    <Link to='/'>Home</Link> |
                    <Link to='/engineers'>Engineers</Link> |
                    <Link to='/companies'>Companies</Link> |
                    <a id='logout' onClick={logout}>Logout</a>
                </div>
            </header>

            <Alert />

            <div className='columns is-justify-center'>
                <div className='column is-half'>
                    <div className='cards'>
                        <h3 id='title-add-engineer'>Add Form Engineer</h3>

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
                                <input id='avatar' onChange={e => onChangeAvatar(e)} type='file' name='avatar'></input>
                            </div>
                            <div className='field'>
                                <button type='submit' className='is-block is-rounded is-padding-small button is-info is-fullwidth'> Submit </button>
                            </div>
                            <div className='field'>
                                <a href='/engineers' className='is-block is-center is-rounded is-padding-small button is-danger is-fullwidth'> Back </a>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addEngineer, logout})(EngineerAdd)
