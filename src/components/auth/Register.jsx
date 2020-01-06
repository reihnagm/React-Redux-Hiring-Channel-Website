import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import 'react-dropdown/style.css'
import Dropdown from 'react-dropdown'

const Register = ({ register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [role, setRole] = useState()

    const { name, email, password } = formData

    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })

    const onChangeRole = (e) => {
        setRole(
            { value: e.value, label: e.label },
            { role: e.value}
        )
    }

    const onSubmit = event => {
        event.preventDefault()
        register({ name, email, password, role })
    }

    const optionsRole = [
        { value: 1, label: 'Engineer'},
        { value: 2, label: 'Company'}
    ]

    if (isAuthenticated) {
        return <Redirect to='/' />
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
                    <h2 id='title-content-login'>Register</h2>

                <form onSubmit={e => onSubmit(e)}>
                    <div id='login-form' className='columns is-direction-column'>
                        <div className='column is-marginless'>
                            <div className='field'>
                                <label id='label-name'>Name</label>
                                <input id='input-name' onChange={e => onChange(e)} value={name} type='name' name='name'/>
                            </div>
                        </div>
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
                        <div className='column is-marginless'>
                            <div className='field'>
                                <label id='label-role'>Role</label>
                                <Dropdown options={optionsRole} value={role} placeholder='Select your Role' onChange={e => onChangeRole(e)} />
                            </div>
                        </div>
                        <div className='columns is-direction-column'>
                            <div className='column is-marginless'>
                                <button id='btn-register' type='submit' className='button is-block is-fullwidth is-rounded'>Register</button>
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
    { register }
)(Register)
