import React, { useState, useEffect, Fragment } from 'react'
import Alert from './Alert'
import Spinner from './Spinner'
import InputMask from 'react-input-mask'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { getEngineer, updateEngineer } from '../../actions/engineer'

const EngineerEdit = ({ getEngineer, updateEngineer, logout, engineer: {  engineer, loading }, match }) => {

    const [formEditEngineer, setFormEditEngineer] = useState({
        name: '',
        description: '',
        skill: '',
        location: '',
        showcase: '',
        telephone: '',
        birthdate: '',
        salary: ''
    })

    const [avatar, setAvatar] = useState()

    const onChange = e => setFormEditEngineer({ ...formEditEngineer, [e.target.name]: e.target.value })

    useEffect(() => {
        getEngineer(match.params.id)

        setFormEditEngineer({
            name: loading || !engineer.name ? '' : engineer.name,
            description: loading || !engineer.description ? '' : engineer.description,
            skill: loading || !engineer.skill ? '' : engineer.skill,
            location: loading || !engineer.location ? '' : engineer.location,
            showcase: loading || !engineer.showcase ? '' : engineer.showcase,
            email: loading || !engineer.email ? '' : engineer.email,
            telephone:  loading || !engineer.telephone ? '' : engineer.telephone,
            birthdate:  loading || !engineer.birthdate ? '' : engineer.birthdate,
            salary: loading || !engineer.salary ? '' : engineer.salary,
            user_id: loading || !engineer.user_id ? '' : engineer.user_id
        })

        setAvatar({
            avatar:  loading || !engineer.avatar ? '' : engineer.avatar
        })

    }, [getEngineer, loading, match.params.id])

    const {name, description, skill, location, showcase, email, telephone, birthdate, salary, user_id} = formEditEngineer

    const onChangeAvatar = async e => {
        const files = e.target.files

        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', 'reihanagam')

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dilzovvfk/image/upload', {
                method: 'POST',
                body: formData
            })
            const file = await response.json()
            setAvatar(file.secure_url)
        } catch(error) {
            alert(error)
        }
    }

    const data = {
        name,
        description,
        skill,
        location,
        birthdate,
        showcase,
        email,
        telephone,
        salary,
        avatar,
        user_id
    }
    
    const update_engineer = (e) => {
        e.preventDefault()
        updateEngineer(match.params.id, data)
    }

    return loading ? (
    <Spinner />
    ) : (
    <Fragment>
        <header className='navbar has-small-vm'>
            <div className='column'>
                <img src={logo} alt='' />
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
                    <h3 id='title-add-engineer'>Edit Form Engineer</h3>

                    <form onSubmit={ e => update_engineer(e) }>
                        <div className='field'>
                            <input onChange={e => onChange(e)} type='text' value={name} name='name' placeholder='Name' />
                        </div>
                        <div className='field'>
                            <textarea onChange={e => onChange(e)}name='description' value={description} placeholder='Description' />
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} type='text' value={skill} name='skill' placeholder='Skill' />
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} type='text' value={location} name='location' placeholder='Location' />
                        </div>
                        <div className='field'>
                            <InputMask name='birthdate' onChange={e => onChange(e)} type='text' mask="9999-99-99" value={birthdate} placeholder='Birthdate'  />
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} type='text' value={showcase} name='showcase' placeholder='Showcase' />
                        </div>
                        <div className='field'>
                            <InputMask name='telephone' onChange={e => onChange(e)} type='text' mask="9999-9999-9999" value={telephone} placeholder='Enter phone number' />
                        </div>
                        <div className='field'>
                            <InputMask  onChange={e => onChange(e)} name='salary' type='text' mask="99.999.999" value={salary} placeholder='Salary' />
                        </div>
                        <div className='field'>
                            <input id='avatar' onChange={e => onChangeAvatar(e)} type='file' name='avatar' />
                        </div>
                        <div className='field'>
                            <button type='submit' className='is-block is-rounded is-padding-small button is-info is-fullwidth'>Submit</button>
                        </div>
                        <div className='field'>
                            <a href='/engineers' className='is-block is-center is-rounded is-padding-small button is-danger is-fullwidth'> Back </a>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    </Fragment>
    )
}

const mapStateToProps = state => ({
    engineer: state.engineer
})

export default connect(mapStateToProps, { getEngineer, updateEngineer, logout })(EngineerEdit)
