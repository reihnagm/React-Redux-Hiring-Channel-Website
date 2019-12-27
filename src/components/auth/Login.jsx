import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import Alert from '../layouts/Alert'

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        login(email, password);
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
                            <h2 id='title-login'> Login </h2>
                            <form onSubmit={e => onSubmit(e)}>
                                <div className='field'>
                                    <label>Email</label>
                                    <input onChange={e => onChange(e)} value={email} type='email' name='email'/>

                                    <label>Password</label>
                                    <input onChange={e => onChange(e)} value={password} type='password' name='password'/>

                                    <a href='/' className='button is-info is-rounded'>Back to Homepage</a>
                                    <button type='submit' className='button is-info is-rounded'>Sign In</button>

                                    <div className='columns is-justify-around is-items-center'>
                                        <span className='label'>Don't have account ?</span>
                                        <a href='/register' className='button is-info is-rounded'>Sign Up</a>
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
    { login }
)(Login)
