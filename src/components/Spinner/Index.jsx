import React, { Fragment } from 'react';
import spinner from '../../images/spinner.gif';
export default () => (
    <Fragment>
        <div className='is-flex is-items-center is-justify-center is-min-h-screen'>
            <div className='spinner spinner-loader'>
                <span className='spinner-item-loader'></span>
                <span className='spinner-item-loader'></span>
                <span className='spinner-item-loader'></span>
            </div>
        </div>
    </Fragment>
);
