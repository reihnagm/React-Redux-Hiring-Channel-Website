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

    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })

    const onSubmit = event => {
        console.log(email, password)
        event.preventDefault()
        login(email, password);
    }

    if (isAuthenticated) {
        return <Redirect to='/engineers' />;
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
                            <div className='column is-marginless'>
                                <button id='btn-register' type='submit' className='button is-block is-fullwidth is-rounded'>Register</button>
                            </div>
                        </div>
                    </div>
                </form>

                </div>
            </div>

            {/*<div className='container'>
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

                                    <Link to='/' className='button is-info is-rounded'>Back to Homepage</Link>
                                    &nbsp;&nbsp;
                                    <button type='submit' className='button is-info is-rounded'>Sign In</button>

                                    <div className='columns is-justify-around is-items-center'>
                                        <span className='label'>Don't have account ?</span>
                                        <Link to='/register' className='button is-info is-rounded'>Sign Up</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

             </div> */}
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
