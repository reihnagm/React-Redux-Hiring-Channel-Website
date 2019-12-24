import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import CompanyItem from './CompanyItem'
import { getAllCompanies } from '../../actions/company'

const Company = ({ getAllCompanies, company: { companies, loading } }) => {

    useEffect(() => {
        getAllCompanies()
    },[getAllCompanies])

    return loading ? ( <Spinner />
    ) : (
            <Fragment>

                <header className='navbar has-small-vm'>
                    <div className='column'>
                        <img src='./logo.png' alt='Logo' />
                    </div>
                    <div id='navbar-company' className='column'>
                        <Link to='/'>Home</Link>
                        <Link to='/company/add'>Add Company</Link>
                    </div>
                </header>

                <div className='has-small-vm'>
                    <div className='columns is-multiline'>
                        {companies.map(company => (
                            <CompanyItem key={company.id} company={company} />
                        ))}
                    </div>
                </div>

            </Fragment >
        )

}

const mapStateToProps = state => ({
    company: state.company
})

export default connect(
    mapStateToProps,
    { getAllCompanies }
)(Company)
