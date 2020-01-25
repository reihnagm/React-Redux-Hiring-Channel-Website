import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../../../images/default.png';
import Spinner from '../../../Spinner/Index';
import { getProfileEngineerBySlug } from '../../../../actions/engineer';
const ProfileShow= ({ getProfileEngineerBySlug, engineer, loading, match  }) => {
    const [loadingMask, setLoading] = useState(loading);
    let avatar = engineer.avatar ? `http://localhost:5000/images/engineer/${engineer.avatar}` : defaultImage;
    let id = engineer.id;
    let name = engineer.name;
    let email = engineer.email;
    let desc =  engineer.description;
    let skill = engineer.skill;
    let location = engineer.location;
    let showcase =  engineer.showcase;
    let birthdate = engineer.birthdate;
    let phone = engineer.telephone;
    useEffect(() => {
        const _fetchData = async () => {
            await getProfileEngineerBySlug(match.params.slug);
            setLoading(false);
        }
        _fetchData();
    }, [getProfileEngineerBySlug]);
    return loadingMask ? ( <Spinner /> ) : (
        <div id="top-screen">
            <div id="box-profile-container">
                <div id="box-profile-avatar">
                    <img id="profile-avatar" src={ avatar }/>
                    <h2 id="profile-email"> { email } </h2>
                    <h3 id="profile-phone"> { phone } </h3>
                    <h4 id="profile-location"> { location } </h4>
                    <h4 id="profile-showcase"> { showcase } </h4>
                    <Link className="is-block is-center is-rounded is-padding-small button is-info is-fullwidth mt-15" to="/engineers"> Back </Link>
                </div>
                <div id="box-profile-name">
                    <h3 id="profile-name"> { name } </h3>
                    <p id="profile-desc">{ desc }</p>
                    <ul id="profile-skill">
                        <li id="profile-list"> <span style={{ fontWeight: 'bold' }}> Skills: </span> { skill } </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    engineer: state.engineer.engineer,
    loading: state.engineer.loading
})
export default connect(
    mapStateToProps,
    { getProfileEngineerBySlug }
)(ProfileShow)
