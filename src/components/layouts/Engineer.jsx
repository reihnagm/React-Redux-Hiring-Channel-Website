import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getEngineers } from '../../actions/engineer'
import { logout } from '../../actions/auth'
import dummyPhoto from '../../images/dummy.jpg'
import logo from '../../images/logo.png'
import 'react-dropdown/style.css'
import Dropdown from 'react-dropdown'
import EngineerItem from './EngineerItem'
import Spinner from './Spinner'

const Engineer = ({ getEngineers, logout,
        engineer: { engineers, loading, search, limit, sortBy, sort },
        auth: { isAuthenticated } }) => {

    const [searchMask, setSearch] = useState(search)
    const [limitMask, setLimit] = useState(limit)
    const [sortByMask, setSortBy] = useState(sortBy)
    const [orderByMask, setOrderBy] = useState(sort)

    const onSearch = e => {
        setSearch(e.target.value)
    }
    const onLimit = e => {
        setLimit(e.value)
    }
    const onSortBy = e => {
        setSortBy(e.value)
    }
    const onOrderBy = e => {
        setOrderBy(e.value)
    }

    useEffect(() => {
        getEngineers(searchMask, limitMask, sortByMask, orderByMask)
    }, [getEngineers, searchMask, limitMask, sortByMask, orderByMask])

    const optionsSortBy = [
        { value: 'date_updated', label: 'Date Updated' },
        { value: 'name', label : 'Name'},
        { value: 'skill', label : 'Skill'}
    ]

    const optionsOrderBy = [
        { value: 'ASC', label: 'Newest'  },
        { value: 'DESC', label: 'Oldest' }
    ]

    const optionsShowPage = [
        { value: '5', label: '5'   },
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '30', label: '30' }
    ]

    return loading ? (<Spinner />
    ) : (
            <Fragment>

                <header id='header' className='navbar'>
                    <img id='logo' src={logo} alt='Logo' />
                    <div className='column is-half'>
                        <div className='field'>
                            <input id='search-header' placeholder='Search by Skill and Name Here...' onChange={e => onSearch(e)} name='search' type='text' />
                        </div>
                    </div>
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
                </header>

                <div id='sort'>
                    <div className='columns'>
                        <div className='column'>
                            <div className='columns is-items-center is-justify-center'>
                                <p id='label-sortBy'>Sort By :</p>
                                <Dropdown options={optionsSortBy} value={sortByMask} onChange={e => onSortBy(e)} />
                            </div>
                        </div>
                        <div className='column'>
                            <div className='columns is-items-center is-justify-center'>
                                <p id='label-orderBy'>Sort :</p>
                                <Dropdown options={optionsOrderBy} value={orderByMask} onChange={e => onOrderBy(e)}  />
                            </div>
                        </div>
                        <div className='column'>
                            <div className='columns is-items-center is-justify-center'>
                                <p id='label-showPage'>Show Page :</p>
                                <Dropdown options={optionsShowPage} value={limitMask} onChange={e => onLimit(e)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div id='content'>
                        <div id='masonry'>
                            {engineers.data.map(engineer => (
                                    <EngineerItem key={engineer.id} engineer={engineer} />
                            ))}
                        </div>
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
