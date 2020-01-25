import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../../../images/default.png';
import Spinner from '../../../Spinner/Index';
import { getProfileCompanyBySlug } from '../../../../actions/company';
const ProfileShow= ({ getProfileCompanyBySlug, company, loading, match  }) => {
    const [loadingMask, setLoading] = useState(loading);
    let logo = company.logo ? `http://localhost:5000/images/company/${company.logo}` : defaultImage;
    let id = company.id;
    let name = company.name;
    let email = company.email;
    let description =  company.description;
    let location = company.location;
    let phone = company.telephone;
    useEffect(() => {
        const _fetchData = async () => {
            await getProfileCompanyBySlug(match.params.slug);
            setLoading(false);
        }
        _fetchData();
    }, [getProfileCompanyBySlug]);
    return loadingMask ? ( <Spinner /> ) : (
        <div id="top-screen">
            <div id="box-profile-container">
                <div id="box-profile-logo">
                    <img id="profile-logo" src={ logo }/>
                    <h2 id="profile-email"> { email } </h2>
                    <h3 id="profile-phone"> { phone } </h3>
                    <h4 id="profile-location"> { location } </h4>
                    <Link className="is-block is-center is-rounded is-padding-small button is-info is-fullwidth mt-15" to="/companies"> Back </Link>
                </div>
                <div id="box-profile-name">
                    <h3 id="profile-name"> { name } </h3>
                    <p id="profile-desc">{ description }</p>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    company: state.company.company,
    loading: state.company.loading
})
export default connect(
    mapStateToProps,
    { getProfileCompanyBySlug }
)(ProfileShow)
