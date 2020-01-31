import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
const Login = ({ login, isAuthenticated, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })
    const onSubmit = event => {
        event.preventDefault();
        login(email, password);
    }
    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    return (
        <Fragment>
            <div className='columns is-justify-center is-min-h-screen'>
                <div className='column is-marginless' id='cover-background-login'>
                    <div id='cover-login'></div>
                    <h2 className='title mb-5'>Hire expert freelancers for any job, online</h2>
                    <h3 className='sub-title'>Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
                </div>
                <div className='column'>
                    <div className='columns is-direction-column'>
                        <div className='column'>
                            <h2 className='text-black is-bold is-size-30'> Login </h2>
                        </div>
                        <div className='column mt-20'>
                            <form className='columns is-direction-column' onSubmit={e => onSubmit(e)}>
                                <div className='column'>
                                    <div className='field'>
                                        <label>Email</label>
                                        <input onChange={e => onChange(e)} value={email} type='text' name='email'/>
                                    </div>
                                </div>
                                <div className='column'>
                                    <div className='field'>
                                        <label>Password</label>
                                        <input onChange={e => onChange(e)} value={password} type='password' name='password'/>
                                    </div>
                                </div>
                                <div className='columns is-direction-column'>
                                    <div className='column'>
                                        <button type='submit' className='button is-block is-fullwidth is-rounded'>Login</button>
                                    </div>
                                    <div className='column'>
                                        <Link to='/' className='button is-block is-fullwidth is-center is-rounded'>Back</Link>
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
