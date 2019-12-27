import React, { useEffect, Fragment } from 'react'
import Spinner from './Spinner'
import CompanyItem from './CompanyItem'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/auth'
import { connect } from 'react-redux'
import { getCompanies } from '../../actions/company'

const Company = ({ getCompanies, company: { companies, loading }, auth: { isAuthenticated }, logout }) => {

    const authLinks = (
        <div id='navbar' className='column'>
            <Link to='/'>Home</Link> |
            <a href='/engineers'>Engineers</a> |
            <a href='/company/add'>Add Company</a> |
            <a id='logout' onClick={logout}> Logout </a>
        </div>
    )

    const guestLinks = (
        <div id='navbar' className='column'>
            <Link to='/'>Home</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
        </div>
    )

    useEffect(() => {
        getCompanies()
    },[getCompanies])

    return loading ? ( <Spinner /> ) :
    (
        <Fragment>

            <header className='navbar has-small-vm'>
                <div className='column'>
                    <img src='./logo.png' alt='Logo' />
                </div>
                <div id='navbar-company' className='column'>
                {!loading && (
                    <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                )}
                </div>
            </header>

            <div className='has-small-vm'>
                <div className='columns is-multiline'>
                    { companies.length !== 0 && companies !== null  && companies.map(company => (
                        <CompanyItem key={company.id} company={company} />
                    ))}
                </div>
            </div>

        </Fragment >
    )

}

const mapStateToProps = state => ({
    company: state.company,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { getCompanies, logout }
)(Company)
