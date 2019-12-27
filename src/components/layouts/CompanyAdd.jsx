import React, { useState } from 'react'
import Alert from './Alert'
import InputMask from 'react-input-mask'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addCompany } from '../../actions/company'
import { logout } from '../../actions/auth'

const CompanyAdd = ({ addCompany, auth: { user, isAuthenticated }, logout }) => {

    let user_id = user === null ? '' : user[0].id

    const [formAddCompany, setFormAddCompany] = useState({
        name: '',
        location: '',
        description: '',
        email: '',
        telephone: ''
    })

    const [logo, setLogo] = useState()

    const { name, location, description, email, telephone } = formAddCompany

    const onChange = e => setFormAddCompany({ ...formAddCompany, [e.target.name]: e.target.value })

    const onChangeLogo = async e => {
        const files = e.target.files

        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'reihanagam')
        const response = await fetch('https://api.cloudinary.com/v1_1/dilzovvfk/image/upload', {
            method: 'POST',
            body: formData
        })
        const file = await response.json()
        console.log(file)
        setLogo(file.secure_url)
    }

    const add_company = (e) => {
        const data = {
            name,
            location,
            description,
            email,
            telephone,
            logo,
            user_id
        }
        e.preventDefault()
        addCompany(data)
    }

    return (
        <div className='has-small-vm'>

            <header className='navbar has-small-vm'>
                <div className='column'>
                    <img src='/logo.png' alt='Logo' />
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
                        <h3 id='title-add-engineer'>Add Form Company</h3>

                        <form onSubmit={ e => add_company(e) }>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={name} type='text' name='name' placeholder='Name' />
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={location} type='text' name='location' placeholder='Location' />
                            </div>
                            <div className='field'>
                                <textarea onChange={e => onChange(e)} value={description} name='description' placeholder='Description'></textarea>
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={email} type='text' name='email' placeholder='Email' />
                            </div>
                            <div className='field'>
                                <InputMask name='telephone' onChange={e => onChange(e)} value={telephone} type='text' mask="9999-9999-9999" placeholder='Enter phone number' />
                            </div>
                            <div className='field'>
                                <input id='logo' onChange={e => onChangeLogo(e)} type='file' name='logo' />
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
    auth: state.auth
})

export default connect(mapStateToProps, {addCompany, logout})(CompanyAdd)
