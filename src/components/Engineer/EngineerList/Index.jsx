import React, { Fragment } from 'react'
import EngineerItem from '../EngineerItem/Index'
const EngineerList = ({ engineers, handlePagination, nextPage, prevPage }) => {
    return (
        <Fragment>
            <div className='container'>
                <div id='masonry'>
                    {engineers && engineers.map(engineer => (
                        <div id='item' key={engineer.id}>
                            <EngineerItem engineer={engineer} />
                        </div>
                    ))}
                </div>
                <div className='is-justify-center is-flex has-small-vm'>
                    <ul id='container-pagination'>
                        <li><span id='link-pagination' onClick={() => handlePagination(prevPage)}> Previous Page </span> </li>
                        <li><span id='link-pagination' onClick={() => handlePagination(nextPage)}> Next Page </span> </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
export default EngineerList
