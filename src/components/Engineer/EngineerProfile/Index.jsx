import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import defaultImage from '../../../images/default.png';
import Spinner from '../../Spinner/Index';
import { getCurrentProfileEngineer, deleteProfileEngineer } from '../../../actions/engineer';
const Profile = ({ getCurrentProfileEngineer, deleteProfileEngineer, engineer: { engineer, loading }, history }) => {
    let avatar = engineer.data && engineer.data.avatar ? `http://localhost:5000/images/engineer/${engineer.data.avatar}` : defaultImage;
    let engineer_id = engineer.data && engineer.data.id;
    let user_id = engineer.data && engineer.data.user_id;
    let name = engineer.data && engineer.data.name;
    let email = engineer.data && engineer.data.email;
    let desc = engineer.data && engineer.data.description;
    let skills = engineer.data && engineer.data.skills;
    let location = engineer.data && engineer.data.location;
    let showcase = engineer.data && engineer.data.showcase;
    let birthdate = engineer.data && engineer.data.birthdate;
    let phone = engineer.data && engineer.data.telephone;
    useEffect(() => {
        const _fetchData = async () => {
            await getCurrentProfileEngineer();
        }
        _fetchData();
    }, [getCurrentProfileEngineer]);
    const deleteProfileAccount = () => {
        Swal.fire({
            title: 'are your sure want to delete account ?',
            text: 'IMPORTANT: data is not back again when you decided to delete an account.',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            confirmButtonColor: 'red',
            cancelButtonColor: 'rgb(201, 152, 227)',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                deleteProfileEngineer(engineer_id, user_id);
                setTimeout(() => {
                    history.push("/");
                }, 800)
            }
        })
    }
    let n = new Date(birthdate);
    let y = n.getFullYear();
    let d = n.getDate();
    let m = n.getMonth()+1;
    let months = ["January","February","March","April","May","June",'July',"August","September","October","November","December"];
    let thisMonth  = months[m-1];
    if(isNaN(y) || isNaN(d) || typeof y === "undefined") {
        y = '';
        d = '';
        thisMonth = '';
    }
    let displayDate = d +' '+ thisMonth +' '+ y ;
    return loading ? ( <Spinner /> ) : (
        <div id="top-screen">
            <div id="box-profile-container">
                <div id="box-profile-avatar">
                    <img id="profile-avatar" src={ avatar } alt={name}/>
                    <h2 id="profile-email"> { email } </h2>
                    <h3 id="profile-phone"> { phone } </h3>
                    <h4 id="profile-location"> { location } </h4>
                    <h4 id="profile-birthdate"> { displayDate }</h4>
                    <h4 id="profile-showcase"> { showcase } </h4>
                    <span className="is-block mt-5 is-center is-rounded button is-fullwidth"
                    onClick={e => deleteProfileAccount(e)}> Delete Account </span>
                    <Link className="is-block mt-5 is-center is-rounded button is-fullwidth" to="/engineers"> Back </Link>
                </div>
                <div id="box-profile-name">
                    <h3 id="profile-name"> { name } </h3>
                    <p id="profile-desc">{ desc }</p>
                    <ul id="profile-skill">
                        <li id="profile-list"> <span style={{ fontWeight: 'bold' }}> Skills: </span> { skills } </li>
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
