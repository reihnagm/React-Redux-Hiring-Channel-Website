import React, { Fragment } from 'react'
import CompanyItem from '../CompanyItem/Index'
const CompanyList = ({ companies, handlePagination, nextPage, prevPage }) => {
    return (
        <Fragment>
            <div className='container'>
                <div id='masonry'>
                    {companies && companies.map(company => (
                        <div id='item' key={company.id}>
                            <CompanyItem company={company} />
                        </div>
                    ))}
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
export default CompanyList