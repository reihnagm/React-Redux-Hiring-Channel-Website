import React, { Fragment } from 'react'
import EngineerItem from '../EngineerItem/Index'
const EngineerList = ({ engineers, handlePagination, nextPage, prevPage }) => {
    return (
        <Fragment>
            <div className='container'>
                <div id='content'>
                    <div id='masonry'>
                        {engineers && engineers.map(engineer => (
                            <div id='item' key={engineer.id}>
                                <EngineerItem engineer={engineer} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='is-justify-center is-flex has-margin-vm'>
                    <ul id='container-pagination'>
                        <li><a id='link-pagination' href='javascript:void(0)' onClick={() => handlePagination(prevPage)}> Previous Page </a> </li>
                        <li><a id='link-pagination' href='javascript:void(0)' onClick={() => handlePagination(nextPage)}> Next Page </a> </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
export default EngineerList
