import React, { Component } from 'react'
import MainHeader from '../templates/MainHeader'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from 'react-date-picker'

export default class EngineerCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            skill: '',
            birthdate: '',
            location: '',
            showcase: '',
            email: '',
            telephone: '',
            salary: '',
            avatar: '',
            date: new Date()
        }
    }

    handlerChangeName = e => {
        this.setState({
            name: e.target.value
        })
    }

    handlerChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }

    handlerChangeSkill = e => {
        this.setState({
            skill: e.target.value
        })
    }

    handlerChangeLocation = e => {
        this.setState({
            location: e.target.value
        })
    }

    handlerChangeBirthdate = date => {
        this.setState({
            date
        })
    }

    handlerChangeShowcase = e => {
        this.setState({
            showcase: e.target.value
        })
    }

    handlerChangeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }

    handlerChangeTelephone = value => {
        this.setState({
            telephone: value
        })
    }

    handlerChangeSalary = e => {
        this.setState({
            salary: e.target.value
        })
    }

    handlerChangeAvatar = e => {
        this.setState({
            avatar: e.target.value
        })
    }

    handlerSubmit = e => {
        e.preventDefault()

        // const showcase = document.querySelector('#showcase').files[0]
        // const avatar = document.querySelector('#avatar').files[0]

        let d = new Date(this.state.date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        const date = [year, month, day].join('-')

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        if(localStorage.getItem('token') === null)
        {
            return Swal.fire({
                    title: 'Whoops!',
                    text: 'Unauthorized!',
                    icon: 'error'
                })
        }

        let base64Url = localStorage.getItem('token').split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        let payload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)}).join('')
        )

        let user = JSON.parse(payload)
        let email = user.email
        let role_id = user.role_id
        let user_id = user.id

        // let formData = new FormData()
        // formData.set('name', this.state.name)
        // formData.set('description', this.state.description)
        // formData.set('skill', this.state.skill)
        // formData.set('location', this.state.location)
        // formData.set('birthdate', date)
        // formData.append('showcase', showcase)
        // formData.set('email', this.state.email)
        // formData.set('telephone', this.state.telephone)
        // formData.set('salary', this.state.salary)
        // formData.set('user_id', user_id)
        // formData.append('avatar', avatar)

        const data = {
            name: this.state.name,
            description: this.state.description,
            skill: this.state.skill,
            location: this.state.location,
            birthdate: date,
            showcase: this.state.showcase,
            email: this.state.email,
            telephone: this.state.telephone,
            salary: this.state.salary,
            user_id: user_id,
            avatar: this.state.avatar
        }

        axios.post('http://3.90.152.67:5000/api/v1/engineers', data).then(res => {
            this.props.history.push("/engineer")
            return Swal.fire({
                    title: 'Yay!',
                    text: res.data.message,
                    icon: 'success'
                })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <React.Fragment>
                <MainHeader />

                <div className='form-engineer'>
                    <h2>Form Create Engineer</h2>
                    <form onSubmit={this.handlerSubmit}>
                        <input
                            id='name'
                            type='text'
                            name='name'
                            onChange={this.handlerChangeName}
                            placeholder='Name'
                        />
                        <textarea
                            id='description'
                            name='description'
                            onChange={this.handlerChangeDescription}
                            placeholder='Description'
                        >
                        </textarea>
                        <input
                            id='skill'
                            type='text'
                            name='skill'
                            onChange={this.handlerChangeSkill}
                            placeholder='Skill'
                        />
                        <input
                            id='location'
                            type='text'
                            name='location'
                            onChange={this.handlerChangeLocation}
                            placeholder='Location'
                        />
                        <label for='birthdate'>Birthdate</label>
                        <DatePicker
                            format='y-M-d'
                            id='birthdate'
                            name='birthdate'
                            onChange={this.handlerChangeBirthdate}
                            value={this.state.date}
                        />
                        <label for='showcase'>Showcase</label>
                        <input
                            id='showcase'
                            type='text'
                            name='showcase'
                            onChange={this.handlerChangeShowcase}
                        />
                        <input
                            id='email'
                            type='email'
                            name='email'
                            onChange={this.handlerChangeEmail}
                            placeholder='Email'
                        />
                        <PhoneInput
                            name='telephone'
                            id='telephone'
                            placeholder='Enter phone number'
                            value={this.state.telephone}
                            onChange={this.handlerChangeTelephone}
                        />
                        <input
                            id='salary'
                            type='text'
                            name='salary'
                            onChange={this.handlerChangeSalary}
                            placeholder='Expected Salary'
                        />
                        <label for='avatar'>Avatar</label>
                        <input
                            id='avatar'
                            type='text'
                            name='avatar'
                            onChange={this.handlerChangeAvatar}
                        />
                        <button type='submit' name='submit'>
                            Create Data
                        </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
