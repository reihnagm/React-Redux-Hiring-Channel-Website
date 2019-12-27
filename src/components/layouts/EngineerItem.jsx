import React, { Fragment } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteEngineer } from '../../actions/engineer'
import Spinner from './Spinner'
const MySwal = withReactContent(Swal)


const EngineerItem = ({ deleteEngineer, loading, engineer: { id, name, avatar, email, salary, skill, user_id }, auth }) => {

    const userid = auth.user === null ? '' : auth.user[0].id

    const delete_engineer = async (e) => {
        e.preventDefault()

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
            setTimeout(function() {
                window.location.reload()
            }, 2000)
        }
    }

    return loading ? (<Spinner />
    )   :
        (
            <Fragment>
                <div className='masonry'>
                    <div className='item'>
                        <img src={avatar} />
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
