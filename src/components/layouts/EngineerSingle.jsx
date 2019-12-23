import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const EngineerSingle = () => {

    return (
        <Fragment>
            <header className='navbar has-small-vm'>
                <div className='column'>
                    <img src='./logo.png' alt='' />
                </div>
                <div className='column'>
                    <Link id='home-link' to='/'>Home</Link>
                </div>
            </header>

            <div className='cards is-horizontal has-small-vm'>
                <img src='https://cdn.idntimes.com/content-images/community/2019/05/keanu-036c463ea1f3c42605f00bbf3bb432e5_600x400.jpg' alt='John Doe' />
                <div className='content'>
                    <ul id='details-engineer'>
                        <li>John Doe</li>
                        <li>Hello iam john doe</li>
                        <li>laravel, css, Javascript</li>
                        <li>Jakarta</li>
                        <li>birthdate</li>
                        <li>https://johndoe.com/showcase</li>
                        <li>johndoe@gmail.com</li>
                        <li>089670558381</li>
                        <li>Expected Salary : 10.000.000</li>
                    </ul>
                </div>
            </div>
        </Fragment >
    )
}


export default connect(null, {})(EngineerSingle)