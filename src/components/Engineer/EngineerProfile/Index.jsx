import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../../images/default.png';
import Spinner from '../../Spinner/Index';
import { getCurrentProfileEngineer, deleteProfileEngineer } from '../../../actions/engineer';
const Profile = ({ getCurrentProfileEngineer, deleteProfileEngineer, engineer: { engineer, loading } }) => {
    const [loadingMask, setLoading] = useState(loading);
    let avatar = engineer.data && engineer.data.avatar ? `http://localhost:5000/images/engineer/${engineer.data.avatar}` : defaultImage;
    let id = engineer.data && engineer.data.id;
    let name = engineer.data && engineer.data.name;
    let email = engineer.data && engineer.data.email;
    let desc = engineer.data && engineer.data.description;
    let skill = engineer.data && engineer.data.skill;
    let location = engineer.data && engineer.data.location;
    let showcase = engineer.data && engineer.data.showcase;
    let birthdate = engineer.data && engineer.data.birthdate;
    let phone = engineer.data && engineer.data.telephone;
    useEffect(() => {
        const _fetchData = async () => {
            await getCurrentProfileEngineer();
            setLoading(false);
        }
        _fetchData();
    }, [getCurrentProfileEngineer]);
    const deleteProfileAccount = () => {
        deleteProfileEngineer(id)
    }
    return loadingMask ? ( <Spinner /> ) : (
        <div id="top-screen">
            <div id="box-profile-container">
                <div id="box-profile-avatar">
                    <img id="profile-avatar" src={ avatar }/>
                    <h2 id="profile-email"> { email } </h2>
                    <h3 id="profile-phone"> { phone } </h3>
                    <h4 id="profile-location"> { location } </h4>
                    <h4 id="profile-showcase"> { showcase } </h4>
                    <a className="is-block is-center is-rounded is-padding-small button is-danger is-fullwidth mt-15" onClick={e => deleteProfileAccount(e)} href="javascript:void(0)"> Delete Account </a>
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
    engineer: state.engineer
})
export default connect(
    mapStateToProps,
    { getCurrentProfileEngineer, deleteProfileEngineer }
)(Profile)
