import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const Landing = ({ isAuthenticated, logout }) => {

    const authLinks = (
        <Fragment>
            <a href='/engineers'>Engineers</a> |
            <a href='/companies'>Companies</a> |
            <a onClick={logout}>Logout</a>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <a href='/engineers'>Engineers</a> |
            <a href='/companies'>Companies</a> |
            <Link to='/register'>Register</Link> |
            <Link to='/login'>Login</Link>
        </Fragment>
    )

    return (
        <div className='container'>

            <header className='navbar has-small-vm'>
                <div className='column'>
                    <img src='' alt="" id='logo' className='img-brand'/>
                </div>

                <div id='navbar' className='column is-half'>
                    <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                </div>
            </header>

            <div className='hero is-center has-small-vm'></div>

        </div>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Landing)
