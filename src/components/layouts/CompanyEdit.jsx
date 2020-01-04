import React, { useState, useEffect, Fragment } from 'react'
import Spinner from './Spinner'
import Alert from './Alert'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { getCompany, updateCompany } from '../../actions/company'

const CompanyEdit = ({ getCompany, updateCompany, logout, company: {  company, loading }, match }) => {

    const [formEditCompany, setFormEditCompany] = useState({
        name: '',
        description: '',
        location: '',
        email: '',
        telephone: '',
        user_id: ''
    })

    const [logo, setLogo] = useState()

    useEffect(() => {
        getCompany(match.params.id)

        setFormEditCompany({
            name: loading || !company.name ? '' : company.name,
            location: loading || !company.location ? '' : company.location,
            description: loading || !company.description ? '' : company.description,
            email: loading || !company.location ? '' : company.location,
            telephone: loading || !company.telephon ? '' : company.telephone,
            user_id: loading || !company.user_id ? '' : company.user_id
        })

        setLogo({
            logo:  loading || !company.logo ? '' : company.logo
        })

    }, [getCompany, loading, match.params.id])

    const {name, location, description, email, telephone, user_id} = formEditCompany

    const onChange = e => setFormEditCompany({ ...formEditCompany, [e.target.name]: e.target.value })

    const onChangeLogo = async e => {
        const files = e.target.files

        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'reihanagam')
        const response = await fetch('https://api.cloudinary.com/v1_1/dilzovvfk/image/upload', {
            method: 'POST',
            body: formData
        })
        const file = await response.json()
        setLogo(file.secure_url)
    }
    const data = {
        name,
        logo,
        location,
        description,
        email,
        telephone,
        user_id
    }
    const update_company = (e) => {
        e.preventDefault()
        updateCompany(match.params.id, data)
    }

    return loading ? (
    <Spinner />
    ) : (
    <Fragment>
        <header className='navbar has-small-vm'>
            <div className='column'>
                <img src='' alt='' />
            </div>
            <div id='navbar' className='column is-half'>
                <Link to='/'>Home</Link> |
                <Link to='/engineers'>Engineers</Link> |
                <Link to='/engineers'>Companies</Link> |
                <a id='logout' onClick={logout}>Logout</a>
            </div>
        </header>

        <Alert />

        <div className='columns is-justify-center'>
            <div className='column is-half'>
                <div className='cards'>
                    <h3 id='title-add-engineer'>Edit Form Company</h3>

                    <form onSubmit={ e => update_company(e) }>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={name} type='text' name='name' placeholder='Name'/>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={location} type='text' name='location' placeholder='Location'/>
                        </div>
                        <div className='field'>
                            <textarea onChange={e => onChange(e)} value={description} name='description' placeholder='Description'></textarea>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={email} type='text' name='email' placeholder='Email'/>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={telephone} type='text' name='telephone' placeholder='Telephone' />
                        </div>
                        <div className='field'>
                            <input id='logo' onChange={e => onChangeLogo(e)} type='file' name='logo' />
                        </div>
                        <div className='field'>
                            <button type='submit' className='is-block is-rounded is-padding-small button is-info is-fullwidth'>Submit</button>
                        </div>
                        <div className='field'>
                            <a href='/companies' className='is-block is-center is-rounded is-padding-small button is-danger  is-fullwidth'> Back </a>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    </Fragment>
    )
}

const mapStateToProps = state => ({
    company: state.company
})

export default connect(mapStateToProps, { getCompany, updateCompany, logout })(CompanyEdit)
