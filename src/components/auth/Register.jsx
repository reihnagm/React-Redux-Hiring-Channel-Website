import React, { Fragment, useState } from 'react'

import { connect } from 'react-redux'

import { Link, Redirect } from 'react-router-dom'
import Alert from '../layouts/Alert'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name,email,password,password2} = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            setAlert('password do not match', 'danger')
        } else {
            register({ name, email, password })
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <Fragment>
            <div className='container'>

                <header className='navbar has-small-vm'>
                    <img src='./logo.png' alt="" id='logo' className='img-brand' />
                </header>

                <Alert />

                <div className='columns is-justify-center'>
                    <div className='column is-half'>
                        <div className='cards'>
                            <h2 id='title-register'> Register </h2>
                            <form onSubmit={e => onSubmit(e)} id='field-register'>
                                <div className='field'>
                                    <label>Name</label>
                                    <input onChange={e => onChange(e)} value={name} type='text' name='name' />

                                    <label>Email</label>
                                    <input onChange={e => onChange(e)} value={email} type='email' name='email' />

                                    <label>Password</label>
                                    <input onChange={e => onChange(e)} value={password} type='password' name='password' />

                                    <label>Confirmation Password</label>
                                    <input onChange={e => onChange(e)} value={password2} type='password' name='password2' />

                                    <a href='/' className='button is-info is-rounded'>Back to Homepage</a>
                                    <button className='button is-info is-rounded'>Sign Up</button>

                                    <div className='columns is-justify-around is-items-center'>
                                        <span className='label'>Already have account ?</span>
                                        <a href='/login' className='button is-info is-rounded'>Sign In</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register)
