import React, { Fragment } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteEngineer } from '../../actions/engineer'
import dummyImage from '../../images/dummy.jpg'
import Spinner from './Spinner'
const MySwal = withReactContent(Swal)

const EngineerItem =
    ({ deleteEngineer, loading,
    engineer: { id, name, email, description, skill, location, birthdate, showcase, telephone, salary, avatar, user_id }, auth }) => {

    const userid = auth.user === null ? '' : auth.user[0].id

    const delete_engineer = async (event) => {
        event.preventDefault()

        const swal = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if(swal.value) {
            deleteEngineer(id)
        }
    }

    let checkAvatar = avatar !== null ? `http://localhost:5000/images/engineer/${avatar}` : dummyImage

    return loading ? ( <Spinner /> ) :
        (
            <Fragment>
                <div id='item'>
                    <img id='avatar' src={checkAvatar} />
                    <div id='description-engineer'>
                        <div style={{
                                padding: '15px 30px',
                                borderRadius: '20px',
                                backgroundColor: 'rgba(0,0,0, 0.4)'
                            }}>
                            <p id='text-name'>{name}</p>
                            <div id='email-and-salary-container'>
                                <p id='text-email'>{email}</p>
                                <p id='text-salary'>Expected Salary: {salary}</p>
                            </div>
                            <p id='title-skill'>Skills :</p>
                            <ul>
                                <li id='text-skill'>{skill}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.engineer.loading
})

export default connect(mapStateToProps,{ deleteEngineer })(EngineerItem)
