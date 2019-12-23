import React, { Fragment, useState } from 'react'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import Alert from '../layouts/Alert'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'

// NOTE: for testing register data
// import axios from 'axios'

const Register = ({ setAlert, register }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            setAlert('password do not match', 'danger')
        } else {

            register({ name, email, password })

            // NOTE: Success post register data testings
            // try {
            //     let config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            //
            //     let body = JSON.stringify(formData)
            //
            //     let response = await axios.post('http://3.90.152.67:5000/auth/register', body, config)
            //     console.log(response.data)
            // } catch (error) {
            //     console.log(error.response.data)
            // }

        }
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

                                    <Link to='/' className='button is-info is-rounded'>Back to Homepage</Link>
                                    <button className='button is-info is-rounded'>Sign Up</button>

                                    <div className='columns is-justify-around is-items-center'>
                                        <span className='label'>Already have account ?</span>
                                        <Link to='/login' className='button is-info is-rounded'>Sign In</Link>
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

export default connect(
    null,
    { setAlert, register }
)(Register)
