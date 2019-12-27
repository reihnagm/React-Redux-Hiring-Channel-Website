import React, { Fragment } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteCompany } from '../../actions/company'
import Spinner from './Spinner'
const MySwal = withReactContent(Swal)

const CompanyItem = ({ deleteCompany, loading, company: { id, name, logo, location, description, email, telephone, user_id }, auth }) => {

    const userid = auth.user === null ? '' : auth.user[0].id

    const delete_company = async (e) => {
        const swal = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if(swal.value === true) {
            deleteCompany(id)
            setTimeout(function() {
                window.location.reload()
            }, 2000)
        }
    }


    return loading ? (< Spinner />
    )   :
        (
            <Fragment>
                <div className='column is-one-third'>
                    <div className='cards fade-in'>
                        <img src={logo} alt={name} />
                            <div id='card-info'>
                                <ul id='list-card-company'>
                                    <li>{name}</li>
                                    <li>{email}</li>
                                    <li>{description}</li>
                                    <li>{telephone}</li>
                                </ul>

                                {!auth.loading && user_id === userid && (
                                    <ul id='option-company'>
                                        <li>
                                            <a href={`/company/edit/${id}`} className='has-margin-vm button is-info is-block'>
                                                Edit
                                            </a>
                                        </li>
                                        <li onClick={e => delete_company(e)} className='has-margin-vm button is-danger is-block'>Delete</li>
                                    </ul>
                                )}

                                <div id='show-details'>
                                    <Link to={`/company/show/${id}`} class='button is-info'>Show Details</Link>
                                </div>
                            </div>
                        </div>
                </div>
            </Fragment>
        )
}

const mapStateToProps = state => ({
    auth: state.auth,
    loading: state.company.loading
})

export default connect(mapStateToProps, { deleteCompany })(CompanyItem)
