import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../Alert/Index';
import store from '../../store';
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })
    const onSubmit = event => {
        event.preventDefault()
        let error = false
        try {
            if(email.trim() === '') {
                error = true
                throw new Error('Email Required.')
            }
            let regexp = /[a-zA-z-0-9_]+@[a-zA-Z]+\.(com|net|org)$/
            let checkEmail = regexp.test(email)
            if(checkEmail) {
                error = false
            } else {
                throw new Error('Invalid Email. e.g : johndoe@gmail.com')
            }
            if(password.trim() === '') {
                error = true
                throw new Error('Password Required.')
            }
            if(password.length < 6) {
                error = true
                throw new Error('Password Minimum 6 Character.')
            }
            if(error === false) {
                login(email, password)
            }
        } catch(error) {
            store.dispatch(setAlert(error.message, 'danger'))
        }
    }
    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    return (
        <Fragment>
            <div className='columns is-items-center is-justify-center'>
                <div id='cover-background-login' className='column is-marginless is-min-h-screen'>
                    <div id='cover-login'></div>
                    <h2>Hire expert freelancers for any job, online</h2>
                    <p id='sub-title-cover-login'>Millions of small businesses use Frelancer to turn their ideas into reality.</p>
                </div>
                <form className='column is-marginless' onSubmit={e => onSubmit(e)}>
                    <div className='columns is-direction-column'>
                        <Alert />
                        <div className='column is-marginless'>
                            <div className='field'>
                                <label id='label-email'>Email</label>
                                <input id='input-email' onChange={e => onChange(e)} value={email} type='text' name='email'/>
                            </div>
                        </div>
                        <div className='column is-marginless'>
                            <div className='field'>
                                <label id='label-password'>Password</label>
                                <input id='input-password' onChange={e => onChange(e)} value={password} type='password' name='password'/>
                            </div>
                        </div>
                        <div className='columns is-direction-column'>
                            <div className='column is-marginless'>
                                <button type='submit' className='button is-block is-fullwidth is-rounded'>Login</button>
                            </div>
                            <div className='column is-marginless'>
                                <Link to='/' className='button is-block is-fullwidth is-center is-rounded'>Back</Link>
                            </div>
                        </div>
                    </div>
                </form>
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
