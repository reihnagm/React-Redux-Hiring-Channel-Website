import React, { Fragment } from 'react';
import Header from './Header';
const Landing = () => {
    return (
        <Fragment>
            <Header />
                <div className='columns is-items-center is-justify-center'>
                    <div className='column is-two-fifths'>
                        <div id='cover-landing'></div>
                    </div>
                    <div className='column is-two-fifths'>
                        <h1 className='title mb-5 text-black'>Welcome to Hiring Channel App</h1>
                        <p className='sub-title text-black'>Want to find a job ? or looking for employees ? </p>
                    </div>
                </div>
        </Fragment>
    )
}
export default Landing;
