import React, { Fragment } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { delete_engineer } from '../../actions/engineer'

const EngineerItem = ({ delete_engineer, engineer: { id, name, avatar, email, salary, skill, user_id }, userid }) => {

    const editEngineer = (e) => {

    }

    const deleteEngineer = (e) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
            delete_engineer(id)
        })
    }

    return (
        <div className='column is-one-third'>
            <div className='cards fade-in'>
                <img src={avatar} alt={name} />
                <div id='card-info'>
                    <span id='name'>{name}</span>
                    <span id='email'>{email}</span>
                    <span id='expected-salary'>Expected Salary: {salary}</span>
                    <p id='skills'>
                        <p>Skills : {skill}</p>
                    </p>

                    { user_id === userid && (
                    <ul id='option-engineer'>
                        <li onClick={e => editEngineer(e)} className='has-margin-vm button is-info is-block'>Edit</li>
                        <li onClick={e => deleteEngineer(e)} className='has-margin-vm button is-danger is-block'>Delete</li>
                    </ul> ) }
                </div>
            </div>
            <Link to='/engineer'>Show Details</Link>
        </div>
    )
}


export default connect(null, {delete_engineer})(EngineerItem)
