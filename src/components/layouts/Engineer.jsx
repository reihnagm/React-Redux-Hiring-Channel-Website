import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getEngineers } from '../../actions/engineer'
import { logout } from '../../actions/auth'
import EngineerItem from './EngineerItem'
import Spinner from './Spinner'

const Engineer = ({ getEngineers, logout,
        engineer: { engineers, loading, search, limit, sortBy, sort },
        auth: { isAuthenticated } }) => {

    const [searchMask, setSearch] = useState(search)
    const [limitMask, setLimit] = useState(limit)
    const [sortByMask, setSortBy] = useState(sortBy)
    const [orderByMask, setOrderBy] = useState(sort)

    const authLinks = (
        <div id='navbar' className='column'>
            <Link to='/'>Home</Link> |
            <a href='/companies'>Companies</a> |
            <a href='/engineer/add'>Add Engineer</a> |
            <a id='logout' onClick={logout}> Logout </a >
        </div>
    )

    const guestLinks = (
        <div id='navbar' className='column'>
            <Link to='/'>Home</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
        </div>
    )

    const onLimit = e => {
        setLimit(e.target.value)
    }
    const onSearch = e => {
        setSearch(e.target.value)
    }
    const onSortBy = e => {
        setSortBy(e.target.value)
    }
    const onOrderBy = e => {
        setOrderBy(e.target.value)
    }

    useEffect(() => {
        getEngineers(searchMask, limitMask, sortByMask, orderByMask)
    }, [getEngineers, searchMask, limitMask, sortByMask, orderByMask])


    return loading ? (<Spinner />
    ) : (
            <Fragment>

                <header className='navbar has-small-vm'>
                    <div className='column'>
                        <img src='./logo.png' alt='Logo' />
                    </div>
                    <div className='column is-half'>
                        <div className='field'>
                            <input onChange={e => onSearch(e)} name='search' type='text' />
                        </div>
                    </div>
                    <div id='navbar-engineer' className='column column is-half'>
                    {!loading && (
                        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                    )}
                    </div>
                </header>

                <div className='has-small-vm'>
                    <div className='columns'>
                        <div className='column'>
                            <div className='columns'>
                                Sort by :
                                    <select onChange={e => onSortBy(e)} name='sortBy'>
                                    <option value='date_updated'>Date Updated</option>
                                    <option value='name'>Name</option>
                                    <option value='skill'>Skill</option>
                                </select>
                            </div>
                        </div>
                        <div className='column'>
                            <div className='columns'>
                                Order by :
                                    <select onChange={e => onOrderBy(e)} name='sort'>
                                    <option value='ASC'>Oldest</option>
                                    <option value='DESC'>Newest</option>
                                </select>
                            </div>
                        </div>
                        <div className='column'>
                            <div className='columns'>
                                Show Page :
                                    <select onChange={e => onLimit(e)} name='limit'>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='has-small-vm'>
                    { engineers.length !== 0 && engineers !== null  && engineers.data.map(engineer => (
                        <EngineerItem key={engineer.id} engineer={engineer} />
                    ))}
                </div>


            </Fragment >
        )

}

const mapStateToProps = state => ({
    engineer: state.engineer,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { getEngineers, logout }
)(Engineer)
