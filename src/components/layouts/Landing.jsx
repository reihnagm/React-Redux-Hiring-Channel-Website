import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Header from './Header';
import Footer from './Footer';
const Landing = () => {
    return (
        <Fragment>
            <Header />
            <Footer />
        </Fragment>
    )
}
export default Landing;
