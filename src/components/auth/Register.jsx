import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
const Register = ({ register, isAuthenticated, history }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [role, setRole] = useState()
    const { name, email, password } = formData
    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })
    const onChangeRole = (element) => {
        setRole(
            { value: element.value, label: element.label },
            { role: element.value}
        )
    }
    const onSubmit = event => {
        event.preventDefault();
        register(name, email, password, role, history);
    }
    const optionsRole = [
        { value: 1, label: "Engineer"},
        { value: 2, label: "Company"}
    ]
    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Fragment>
            <div className="columns justify-center min-h-screen">
                <div className="column marginless" id="cover-background-register">
                    <div id="cover-register"></div>
                    <h2 className="title mx-3 text-white">Hire expert freelancers for any job, online</h2>
                    <h3 className="sub-title mx-3 text-white">Millions of small businesses use Frelancer to turn their ideas into reality.</h3>
                </div>
                <div className="column">
                    <div className="columns direction-column">
                        <div className="column">
                            <h2 className="bold title">Register</h2>
                        </div>
                        <div className="column mt-20">
                            <form onSubmit={event => onSubmit(event)}>
                                <div className="field mb-3">
                                    <label>Name</label>
                                    <input onChange={e => onChange(e)} value={name} type="text" name="name"/>
                                </div>
                                <div className="field mb-3">
                                    <label>Email</label>
                                    <input
                                        onChange={e => onChange(e)}
                                        value={email}
                                        type="text"
                                        name="email"/>
                                </div>
                                <div className="field mb-3">
                                    <label>Password</label>
                                    <input
                                        onChange={e => onChange(e)}
                                        value={password}
                                        type="password"
                                        name="password"/>
                                </div>
                                <div className="field mb-3">
                                    <label>Role</label>
                                    <Dropdown
                                        options={optionsRole}
                                        value={role}
                                        placeholder="Select your Role"
                                        onChange={event => onChangeRole(event)} />
                                </div>
                                <div className="columns direction-column">
                                    <Button type="submit" variant="contained" color="primary">Register</Button>
                                    <Button type="button" variant="contained" color="primary" component={ Link } to="/">Back</Button>
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
