import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const CompanyItem = ({ company: { id, name, logo, location, description, email, telephone } }) => {

    return (
        <div className='column is-one-third'>
            <div className='cards fade-in'>
                <img src={logo} alt={name} />
                <ul id='card-info-company'>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li>{description}</li>
                    <li>{telephone}</li>
                </ul>
            </div>
        </div>
    )
}


export default connect(null, {})(CompanyItem)
