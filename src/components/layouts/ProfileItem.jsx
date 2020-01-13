import React from 'react'
import { connect } from 'react-redux'

const ProfileItem = ({ engineer, auth: { user } }) => {

    let name, email, avatar, date_created, date_updated

    if(typeof user === "undefined" || typeof engineer === "undefined" || user === null || engineer === null) {
        return false
    } else {
        name = user.data.name
        email = user.data.email
        avatar = user.data.avatar === null ? 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg' :
        `http://localhost:5000/images/engineer/${user.data.avatar}`
        date_created = engineer.date_created
        date_updated = engineer.date_updated
    }

    return (
        <>
            <div id="top-screen">
                <div id="box-profile-container">
                    <div id="box-profile-avatar">
                        <img src={ avatar }/>
                    </div>
                    <div id="box-profile-name">
                        <h2> { name } </h2>
                    </div>
                </div>
            </div>
        </>
    )
    
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {}
)(ProfileItem)
