import React, { useState, useEffect, Fragment } from 'react'
import Alert from './Alert'
import PhoneInput from 'react-phone-number-input'
// import DatePicker from "react-datepicker"
// import {registerLocale, setDefaultLocal} from "react-datepicker"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { add_engineer } from '../../actions/engineer'
import { auth } from '../../actions/auth'
import axios from 'axios'
import 'react-phone-number-input/style.css'
// import "react-datepicker/dist/react-datepicker.css"
// import es from 'date-fns/locale/es'

// registerLocale('es', es)

const EngineerForm = ({ add_engineer, auth: { user } }) => {

    let user_id = ''

    if(user === null) {
        console.log('data nya di render dulu ya')
    } else {
        user_id = user[0].id
    }

    const [formAddEngineer, setFormAddEngineer] = useState({
        name: '',
        description: '',
        skill: '',
        location: '',
        showcase: '',
        email: '',
        salary: ''
    })

    const [telephone, setTelephone] = useState()
    const [birthdate, setBirthdate] = useState()

    const { name, description, skill, location, showcase, email, salary, avatar } = formAddEngineer

    const onChange = e => setFormAddEngineer({ ...formAddEngineer, [e.target.name]: e.target.value })

    const onChangeBirthdate = e => {
        setBirthdate(e.target.value)
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
        user_id
    }

    // const onChangeAvatar = async e => {
    //     const files = e.target.files
    //
    //     const formData = new FormData()
    //
    //     formData.append('file', files[0])
    //     formData.append('upload_preset', 'reihanagam')
    //
    //     const response = await fetch('http://3.90.152.67:5000/api/v1/engineers/upload-avatar', {
    //         method: 'POST',
    //         body: formData
    //     }) // NOTE: if use axios not work
    //
    //     const file = await response.json() //
    //     console.log(file)
    //
    //     setAvatarAddEngineer(file.secure_url)
    //
    // }

    const addEngineer = async (e) => {
        e.preventDefault()
        add_engineer(data)
    }

    return (
        <div className='has-small-vm'>

            <header className='navbar has-small-vm'>
                <div className='column'>
                    <img src='/logo.png' alt='Logo' />
                </div>
                <div className='column'>
                    <Link id='home-link' to='/'>Home</Link>
                </div>
            </header>

            <Alert />

            <div className='columns is-justify-center'>
                <div className='column is-half'>
                    <div className='cards'>
                        <h3 id='title-add-engineer'>Add Form Engineer</h3>


                        <form onSubmit={ e => addEngineer(e) }>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={name} type='text' name='name' placeholder='Name'></input>
                            </div>
                            <div className='field'>
                                <textarea onChange={e => onChange(e)} value={description} name='description' placeholder='Description'></textarea>
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={skill} type='text' name='skill' placeholder='Skill'></input>
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={location} type='text' name='location' placeholder='Location'></input>
                            </div>
                            <div className='field'>
                                {/*    // <DatePicker
                                //     locale="es"
                                //     onChange={setBirthdate}
                                //     selected={birthdate}
                                //     peekNextMonth
                                //     showMonthDropdown
                                //     showYearDropdown
                                //     dateFormat="yyyy-MM-dd"
                                // /> */}
                                <input onChange={e => onChangeBirthdate(e)} value={birthdate} type='text' name='birthdate' placeholder='Birthdate'></input>
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={showcase} type='text' name='showcase' placeholder='Showcase'></input>
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={email} type='text' name='email' placeholder=' Email'></input>
                            </div>
                            <div className='field'>
                                <PhoneInput country="ID" onChange={setTelephone} placeholder="Enter phone number" value={telephone} />
                            </div>
                            <div className='field'>
                                <input onChange={e => onChange(e)} value={salary} type='text' name='salary' placeholder='Salary' ></input>
                            </div>
                            <div className='field'>
                                <img src='' alt='Avatar' />
                                <input id='avatar' onChange={e => onChange(e)} type='file' value={avatar} name='avatar'></input>
                            </div>
                            <div className='field'>
                                <button type='submit' className='is-block is-rounded is-padding-small button is-info is-fullwidth'> Submit </button>
                            </div>
                            <div className='field'>
                                <Link to='/engineers' className='is-block is-center is-rounded is-padding-small button is-danger  is-fullwidth'> Back </Link>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {add_engineer})(EngineerForm)
