import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import EngineerItem from './EngineerItem'
import Spinner from './Spinner'

import { getAllEngineers } from '../../actions/engineer' // NOTE: this is what you export in actions e.g export const getAllEngineers

const Engineer = ({ getAllEngineers, engineer: { engineers, loading } }) => {

    const [Engineer, setDataEngineer] = useState({
        search: '',
        limit: 5,
        sortBy: 'date_updated'
    })

    const { search, limit, sortBy } = Engineer

    // NOTE : this is to getting all data with same type
    // const onChange = e => setDataEngineer({ ...Engineer, [e.target.name]: e.target.value })

    const onSearch = e => {
        setDataEngineer({
            search: e.target.value,
            limit,
            sortBy
        })
    }

    const onSortBy = e => {
        setDataEngineer({
            sortBy: e.target.value,
            search,
            limit
        })
    }

    const onLimit = e => {
        setDataEngineer({
            limit: e.target.value,
            search,
            sortBy
        })
    }

    const loadMore = e => {
        setDataEngineer({
            limit: limit + 4,
            search,
            sortBy
        })
    }

    useEffect(() => {
        getAllEngineers(search, limit, sortBy)
    }, [getAllEngineers, search, limit, sortBy]) // NOTE: use useEffect to render read data in props

    return loading ? (<Spinner />
    ) : (
            <Fragment>

                <header className='navbar has-small-vm'>
                    <div className='column'>
                        <img src='./logo.png' alt='Logo' />
                    </div>
                    <div className='column'>
                        <div className='field'>
                            <input onChange={e => onSearch(e)} value={search} name='search' type='text' />
                        </div>
                    </div>
                    <div className='column'>
                        <Link id='home-link' to='/'>Home</Link>
                        <Link id='engineer-add-link' to='/engineer/add'>Add Engineer</Link>
                    </div>
                </header>

                <div className='has-small-vm'>
                    <div className='columns'>
                        <div className='column'>
                            <div className='columns'>
                                Filter by :
                                     <select onChange={e => onSortBy(e)} name='sortBy'>
                                    <option value='date_updated'>date updated</option>
                                    <option value='name'>name</option>
                                    <option value='skill'>skill</option>
                                </select>
                            </div>
                        </div>
                        <div className='column'>
                            <div className='columns'>
                                Limit :
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
                    <div className='columns is-multiline'>
                        {engineers.data.slice(0, limit).map(engineer => (
                            <EngineerItem key={engineer.id} engineer={engineer} /> /* NOTE: if you want mapping data, should be use different component, if not, getting error */
                        ))}
                    </div>
                    {limit == engineers.data.length &&
                        <div className='is-center'>
                            <button onClick={e => loadMore(e)} type="button" className='button is-info'>Load more</button>
                        </div>
                    }
                </div>

            </Fragment >
        )

}

const mapStateToProps = state => ({
    engineer: state.engineer,  // NOTE: state.engineer (file in reducers, trigger on what index.js passing, e.g engineer)
})

export default connect(
    mapStateToProps,
    { getAllEngineers }
)(Engineer) // NOTE: Component connect to Redux
