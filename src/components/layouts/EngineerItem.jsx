import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const EngineerItem = ({ engineer: { id, name, avatar, email, salary, skill } }) => {

    return (
        <div className='column is-one-third'>
            <div className='cards fade-in'>
                <img src={avatar} alt={name} />
                <div id='card-info'>
                    <span id='name'>{name}</span>
                    <span id='email'>{email}</span>
                    <span id='expected-salary'>Expected Salary: {salary}</span>
                    <p id='skills'>
                        <p>Skills : {skill}</p>
                    </p>
                </div>
            </div>
            <Link to='/engineer'>Show Details</Link>
        </div>
    )
}


export default connect(null, {})(EngineerItem)