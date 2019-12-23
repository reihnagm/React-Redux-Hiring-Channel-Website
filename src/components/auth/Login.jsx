import React, { Fragment, useState } from 'react'

import { Link } from 'react-router-dom'
import Alert from '../layouts/Alert'
import { connect } from 'react-redux'

// NOTE: testing login
// import axios from 'axios'

import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {

        e.preventDefault()

        login(email, password);

        // NOTE: Success
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
                            <h2 id='title-login'> Login </h2>
                            <form onSubmit={e => onSubmit(e)}>
                                <div className='field'>
                                    <label>Email</label>
                                    <input onChange={e => onChange(e)} value={email} type='email' name='email' required />

                                    <label>Password</label>
                                    <input onChange={e => onChange(e)} value={password} type='password' name='password' required />

                                    <Link to='/' className='button is-info is-rounded'>Back to Homepage</Link>
                                    <button className='button is-info is-rounded'>Sign In</button>
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
    { login }
)(Login)
