import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../../images/default.png';
import Spinner from '../../Spinner/Index';
import { getCurrentProfileCompany, deleteProfileCompany } from '../../../actions/company';
const Profile = ({ getCurrentProfileCompany, deleteProfileCompany, company: { company, loading } }) => {
    const [loadingMask, setLoading] = useState(loading);
    let id = company.data && company.data.id;
    let name = company.data && company.data.name;
    let logo = company.data && company.data.logo ? `http://localhost:5000/images/company/${company.data.logo}` : defaultImage;
    let email = company.data && company.data.email;
    let description = company.data && company.data.description;
    let location = company.data && company.data.location;
    let phone = company.data && company.data.telephone;
    useEffect(() => {
        const _fetchData = async () => {
            await getCurrentProfileCompany();
            setLoading(false);
        }
        _fetchData();
    }, [getCurrentProfileCompany]);
    const deleteProfileAccount = () => {
        deleteProfileCompany(id);
    }
    return loadingMask ? ( <Spinner /> ) : (
        <div id="top-screen">
            <div id="box-profile-container">
                <div id="box-profile-logo">
                    <img id="profile-logo" src={ logo }/>
                    <h2 id="profile-email"> { email } </h2>
                    <h3 id="profile-phone"> { phone } </h3>
                    <h4 id="profile-location"> { location } </h4>
                    <a className="is-block is-center is-rounded is-padding-small button is-danger is-fullwidth mt-15" onClick={e => deleteProfileAccount(e)} href="javascript:void(0)"> Delete Account </a>
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
    company: state.company
});
export default connect(
    mapStateToProps,
    { getCurrentProfileCompany, deleteProfileCompany }
)(Profile);
