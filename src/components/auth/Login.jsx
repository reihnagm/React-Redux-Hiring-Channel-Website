import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
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
            if(email === '') {
                error = true
                throw new Error('Email required')
            }
            if(password === '') {
                error = true
                throw new Error('Password required')
            }
            if(error === false) {
                console.log('test')
                login(email, password)
            }
        } catch(error) {
            setError(error.message)
        }
    }
    if (isAuthenticated) {
        return <Redirect to='/engineers' />
    }
    return (
        <Fragment>
            <div className='columns'>
                <div id='cover-background-login' className='column is-marginless'>
                    <div id='cover-login'></div>
                    <h2 id='title-cover-login'>Hire expert freelancers for any job, online</h2>
                    <p id='sub-title-cover-login'>Millions of small businesses use Frelancer to turn their ideas into reality.</p>
                </div>
                <div id='content-login' className='column is-marginless'>
                    <h2 id='title-content-login'>Login</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div id='login-form' className='columns is-direction-column'>
                        <div className='column is-marginless'>
                            <div className='field'>
                                <label id='label-email'>Email</label>
                                <input id='input-email' onChange={e => onChange(e)} value={email} type='email' name='email'/>
                            </div>
                        </div>
                        <div className='column is-marginless'>
                            <div className='field'>
                                <label id='label-password'>Password</label>
                                <input id='input-password' onChange={e => onChange(e)} value={password} type='password' name='password'/>
                            </div>
                        </div>
                        <div id='container-login-register' className='columns is-direction-column'>
                            <div className='column is-marginless'>
                                <button id='btn-login' type='submit' className='button is-block is-fullwidth is-rounded'>Login</button>
                            </div>
                        </div>
                    </div>
                </form>
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
