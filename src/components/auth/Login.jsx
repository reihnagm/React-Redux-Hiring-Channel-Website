import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Button } from '@material-ui/core';
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
        <>
            <div className="columns justify-center min-h-screen">
                <div className="column marginless" id='cover-background-login'>
                    <div id="cover-login"></div>
                    <h2 className="title mx-2 text-white">Hire expert freelancers for any job, online</h2>
                    <h3 className="sub-title mx-2 text-white">Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
                </div>
                <div className="column">
                    <div className="columns direction-column">
                        <div className="column">
                            <h2 className="bold title"> Login </h2>
                        </div>
                        <div className="column mt-20">
                            <form className="columns direction-column" onSubmit={event => onSubmit(event)}>
                                <div className="field mb-3">
                                    <label>Email</label>
                                    <input onChange={event => onChange(event)} value={email} type="text" name="email"/>
                                </div>
                                <div className="field mb-3">
                                    <label>Password</label>
                                    <input onChange={event => onChange(event)} value={password} type='password' name='password'/>
                                </div>
                                <div className="columns direction-column">
                                    <Button type="submit" variant="contained" color="primary">Login</Button>
                                    <Button type="button" variant="contained" color="primary" component={ Link } to="/">Back</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(
    mapStateToProps,
    { login }
)(Login)
