import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getEngineers } from '../../actions/engineer'
import { logout } from '../../actions/auth'
import dummyPhoto from '../../images/dummy.jpg'
import EngineerItem from './EngineerItem'
import Spinner from './Spinner'

const Engineer = ({ getEngineers, logout,
        engineer: { engineers, loading, search, limit, sortBy, sort },
        auth: { isAuthenticated } }) => {

    const [searchMask, setSearch] = useState(search)
    const [limitMask, setLimit] = useState(limit)
    const [sortByMask, setSortBy] = useState(sortBy)
    const [orderByMask, setOrderBy] = useState(sort)

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

                <header id='header' className='navbar'>
                    <div className='column'>
                        <img src='' alt='Logo' />
                    </div>
                    <div className='column is-half'>
                        <div className='field'>
                            <input id='search-header' onChange={e => onSearch(e)} name='search' type='text' />
                        </div>
                    </div>
                    <div id='navbar-engineer' className='column is-two-third'>
                        <ul id="header-menu">
                            <li><Link to='/'>Home</Link></li>
                            <li id='display-username'>
                                <img id='small-avatar' src={dummyPhoto}/>
                                <Link id='username-link' to='/'>Reihan Agam</Link>
                                <ul id="sub-header-menu">
                                    <li><Link to='/'>Update Profile</Link></li>
                                    <li><Link to='/'>Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </header>

                <div id='sort'>
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

                <div id='content'>
                    <div id='masonry'>
                        {engineers.data.map(engineer => (
                                <EngineerItem key={engineer.id} engineer={engineer} />
                        ))}
                    </div>
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
