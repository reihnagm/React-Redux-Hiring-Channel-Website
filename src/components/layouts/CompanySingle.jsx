import React, { useEffect, Fragment } from 'react'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { getCompany } from '../../actions/company'

const CompanySingle = ({ getCompany, logout, company: {  company, loading }, match }) => {

    useEffect(() => {
        getCompany(match.params.id)
    }, [getCompany, match.params.id])

    return loading || company === null ? (
    <Spinner />
    ) : (
    <Fragment>
        <header className='navbar has-small-vm'>
            <div className='column'>
                <img src='' alt='' />
            </div>
            <div id='navbar' className='column is-half'>
                <Link to='/'>Home</Link> |
                <a href='/engineers'>Engineers</a> |
                <a href='/companies'>Companies</a> |
                <a id='logout' onClick={logout}> Logout </a>
            </div>
        </header>

        <div className='cards is-horizontal has-small-vm'>
            <img src={company.logo} alt={company.name} />
            <div className='content'>
                <ul id='details-engineer'>
                    <li>{company.name}</li>
                    <li>{company.location}</li>
                    <li>{company.description}</li>
                    <li>{company.email}</li>
                    <li>{company.telephone}</li>
                </ul>
            </div>
        </div>

        <Link to='/companies' className='button is-info'>
            Back To Companies
        </Link>

    </Fragment>
    )
}

const mapStateToProps = state => ({
    company: state.company
})

export default connect(
    mapStateToProps,
    { getCompany, logout }
)(CompanySingle)
