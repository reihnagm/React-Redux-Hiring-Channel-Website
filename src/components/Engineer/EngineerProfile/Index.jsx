import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../../images/default.png';
import Spinner from '../../Spinner/Index';
import { getCurrentProfileEngineer, deleteProfileEngineer } from '../../../actions/engineer';
const Profile = ({ getCurrentProfileEngineer, deleteProfileEngineer, engineer: { engineer, loading }, history }) => {
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
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
        _fetchData();
    }, [getCurrentProfileEngineer]);
    const deleteProfileAccount = () => {
        deleteProfileEngineer(id)
        setTimeout(() => {
            history.push("/");
        }, 800)
    }
    let n = new Date(birthdate);
    let y = n.getUTCFullYear();
    let d = n.getUTCDate()+1;
    let m = n.getUTCMonth()+1;
    let months = ["January","Februari","Maret","April","Mei","Juni",'Juli',"Agustus","September","Oktober","November","Desember"];
    let thisMonth  = months[m-1];
    if(isNaN(y) || isNaN(d) || typeof y === "undefined") {
        y = '';
        d = '';
        thisMonth = '';
    }
    let displayDate = d +' '+ thisMonth +' '+ y ;
    return loadingMask ? ( <Spinner /> ) : (
        <div id="top-screen">
            <div id="box-profile-container">
                <div id="box-profile-avatar">
                    <img id="profile-avatar" src={ avatar } alt={name}/>
                    <h2 id="profile-email"> { email } </h2>
                    <h3 id="profile-phone"> { phone } </h3>
                    <h4 id="profile-location"> { location } </h4>
                    <h4 id="profile-birthdate"> { displayDate }</h4>
                    <h4 id="profile-showcase"> { showcase } </h4>
                    <span className="is-block mt-5 is-center is-rounded button is-fullwidth" onClick={e => deleteProfileAccount(e)}> Delete Account </span>
                    <Link className="is-block  mt-5 is-center is-rounded button is-fullwidth" to="/engineers"> Back </Link>
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
