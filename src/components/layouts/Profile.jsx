import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ProfileItem from './ProfileItem'
import { getCurrentProfileEngineer } from '../../actions/engineer'

const Profile = ({ getCurrentProfileEngineer, engineer: { engineer, loading }, auth: { user } }) => {

    const getDataEngineer = () => {
        if(typeof engineer === "undefined" || engineer === null) {
            return false
        } else {
            return engineer.data
        }
    }

    const getUserId = () => {
        if(typeof user === "undefined" || user === null) {
            return false
        } else {
            return user.data.id
        }
    }

    useEffect(() => {
        getCurrentProfileEngineer(getUserId())
    },[])

    return (
        <>
            <ProfileItem engineer={getDataEngineer()}></ProfileItem>
        </>
    )
}

const mapStateToProps = state => ({
    engineer: state.engineer,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { getCurrentProfileEngineer }
)(Profile)
