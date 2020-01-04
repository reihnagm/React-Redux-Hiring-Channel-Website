import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'

const Register = ({ register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 1,
        password: '',
        password2: ''
    })

    const { name, email, password, password2, role } = formData

    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })

    const onSubmit = async event => {
        event.preventDefault()
        if (password !== password2) {
            // setAlert('password do not match', 'danger')
            // mau dari sweetalert
        } else {
            register({ name, email, password, role })
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

                <div className='columns is-justify-center'>
                    <div className='column is-half'>
                        <div className='cards'>
                            <h2 id='title-register'> Register </h2>
                            <form onSubmit={e => onSubmit(e)} id='field-register'>
                                <div className='field'>
                                    <label>Name</label>
                                    <input onChange={event => onChange(event)} value={name} type='text' name='name' />

                                    <label>Email</label>
                                    <input onChange={event => onChange(event)} value={email} type='email' name='email' />

                                    <label>Password</label>
                                    <input onChange={event => onChange(event)} value={password} type='password' name='password' />

                                    <label>Confirmation Password</label>
                                    <input onChange={event => onChange(event)} value={password2} type='password' name='password2' />

                                    <select name="role" onChange={event => onChange(event)} value={role}>
                                        <option value="1">Engineer</option>
                                        <option value="2">Company</option>
                                    </select>

                                    <Link to='/' className='button is-info is-rounded'>Back to Homepage</Link>
                                    <button className='button is-info is-rounded'>Sign Up</button>

                                    <div className='columns is-justify-around is-items-center'>
                                        <span className='label'>Already have account ?</span>
                                        <Link href='/login' className='button is-info is-rounded'>Sign In</Link>
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
    { register }
)(Register)
