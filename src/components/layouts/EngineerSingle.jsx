import React, { useEffect, Fragment } from 'react'
import Spinner from './Spinner'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { getEngineer } from '../../actions/engineer'

const EngineerSingle = ({ getEngineer, logout, auth: { isAuthenticated }, engineer: {  engineer, loading }, match }) => {

    const authLinks = (
        <div id='navbar' className='column is-half'>
            <Link to='/'>Home</Link> |
            <a href='/engineers'>Engineers</a> |
            <a href='/companies'>Companies</a> |
            <a id='logout' onClick={logout}> Logout </a>
        </div>
    )

    const guestLinks = (
        <div id='navbar' className='column is-half'>
            <Link to='/'>Home</Link> |
            <Link to='/register'>Register</Link> |
            <Link to='/login'>Login</Link>
        </div>
    )

    useEffect(() => {
        getEngineer(match.params.id);
    }, [getEngineer, match.params.id]);

    return loading || engineer === null ? (
    <Spinner />
    ) : (
    <Fragment>
        <header className='navbar has-small-vm'>
            <div className='column'>
                <img src='' alt='' />
            </div>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </header>

        <div className='cards is-horizontal has-small-vm'>
            <img src={engineer.avatar} alt={engineer.name} />
            <div className='content'>
                <ul id='details-engineer'>
                    <li>{engineer.name}</li>
                    <li>{engineer.description}</li>
                    <li>{engineer.skill}</li>
                    <li>{engineer.location}</li>
                    <li> Birthdate{' '}
                        <Moment format="YYYY/MM/DD">
                            {engineer.birthdate}
                        </Moment>
                    </li>
                    <li>{engineer.showcase}</li>
                    <li>{engineer.email}</li>
                    <li>{engineer.telephone}</li>
                    <li>Expected Salary : {engineer.salary}</li>
                </ul>
            </div>
        </div>

        <a href='/engineers' className='button is-info'>
            Back To Engineers
        </a>

    </Fragment>
    )
}

const mapStateToProps = state => ({
    engineer: state.engineer,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { getEngineer, logout }
)(EngineerSingle)
