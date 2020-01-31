import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { register } from '../../actions/auth';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
const Register = ({ register, isAuthenticated, history }) => {
    const Toast = Swal.mixin({
        position: 'top-end',
        toast: true,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: false,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
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
        register(name, email, password, role, history);
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
            <div className='columns is-justify-center is-min-h-screen'>
                <div className='column is-marginless' id='cover-background-register'>
                    <div id='cover-register'></div>
                    <h2 className='title mb-5'>Hire expert freelancers for any job, online</h2>
                    <h3 className='sub-title'>Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
                </div>
                <div className='column'>
                    <div className='columns is-direction-column'>
                        <div className='column'>
                            <h2 className='text-black is-bold is-size-30'>Register</h2>
                        </div>
                        <div className='column mt-10'>
                            <form className='columns is-direction-column' onSubmit={e => onSubmit(e)}>
                                <div className='column'>
                                    <div className='field'>
                                        <label>Name</label>
                                        <input onChange={e => onChange(e)} value={name} type='text' name='name'/>
                                    </div>
                                </div>
                                <div className='column'>
                                    <div className='field'>
                                        <label>Email</label>
                                        <input
                                            onChange={e => onChange(e)}
                                            value={email}
                                            type='text'
                                            name='email'/>
                                    </div>
                                </div>
                                <div className='column'>
                                    <div className='field'>
                                        <label>Password</label>
                                        <input
                                            onChange={e => onChange(e)}
                                            value={password}
                                            type='password'
                                            name='password'/>
                                    </div>
                                </div>
                                <div className='column'>
                                    <div className='field'>
                                        <label>Role</label>
                                        <Dropdown
                                            options={optionsRole}
                                            value={role}
                                            placeholder='Select your Role'
                                            onChange={e => onChangeRole(e)} />
                                    </div>
                                </div>
                                <div className='columns is-direction-column'>
                                    <div className='column'>
                                        <button type='submit' className='button is-block is-fullwidth is-rounded'>Register</button>
                                    </div>
                                    <div className='column'>
                                        <Link to='/' className='button is-center is-block is-fullwidth is-rounded'>Back</Link>
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
