import React, { Component } from 'react'
import axios from 'axios'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from 'react-date-picker'

export default class EngineerEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            skill: '',
            location: '',
            birthdate: '',
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

        const id = this.props.match.params.id

        const showcase = document.querySelector('#showcase').files[0]
        const avatar = document.querySelector('#avatar').files[0]

        let d = new Date(this.state.date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

            const date = [year, month, day].join('-')

            if (month.length < 2) month = '0' + month
            if (day.length < 2) day = '0' + day

            // FOR DEBUGGING DATA
            // let data = {
            //   name: this.state.name,
            //   description: this.state.description,
            //   skill: this.state.skill,
            //   location: this.state.location,
            //   birthdate: this.state.birthdate,
            //   showcase: this.state.showcase,
            //   email: this.state.email,
            //   telephone: this.state.telephone,
            //   salary: this.state.salary,
            //   avatar: this.state.avatar
            // }

            // console.log(data)

            let formData = new FormData()
            formData.set('name', this.state.name)
            formData.set('description', this.state.description)
            formData.set('skill', this.state.skill)
            formData.set('location', this.state.location)
            formData.set('birthdate', date)
            formData.append('showcase', showcase)
            formData.set('email', this.state.email)
            formData.set('telephone', this.state.telephone)
            formData.set('salary', this.state.salary)
            formData.append('avatar', avatar)

        axios({
            method: 'PATCH',
            url: `http://3.90.152.67:5000/api/v1/engineers/${id}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    getData()
    {
        const id = this.props.match.params.id
        axios.get(`http://3.90.152.67:5000/api/v1/engineers/${id}`).then(res => {
            this.setState({
                name: res.data.data[0].name,
                description: res.data.data[0].description,
                skill: res.data.data[0].skill,
                location: res.data.data[0].location,
                birthdate: res.data.data[0].date_of_birth,
                showcase: res.data.data[0].showcase,
                email: res.data.data[0].email,
                telephone: res.data.data[0].telephone,
                salary: res.data.data[0].salary,
                avatar: res.data.data[0].avatar
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
            return (
                <div className='form-engineer'>
                    <h2>Form Edit Engineer</h2>
                    <form onSubmit={this.handlerSubmit}>
                        <input
                            id='name'
                            type='text'
                            name='name'
                            onChange={this.handlerChangeName}
                            value={this.state.name}
                            placeholder='Name'
                        />
                        <textarea
                            id='description'
                            name='description'
                            onChange={this.handlerChangeDescription}
                            value={this.state.description}
                            placeholder='Description'
                        >
                        </textarea>
                        <input
                            id='skill'
                            type='text'
                            name='skill'
                            onChange={this.handlerChangeSkill}
                            value={this.state.skill}
                            placeholder='Skill'
                        />
                        <input
                            id='location'
                            type='text'
                            name='location'
                            onChange={this.handlerChangeLocation}
                            value={this.state.location}
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
                            type='file'
                            name='showcase'
                            onChange={this.handlerChangeShowcase}
                        />
                        <input
                            id='email'
                            type='email'
                            name='email'
                            onChange={this.handlerChangeEmail}
                            placeholder='Email'
                            value={this.state.email}
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
                            value={this.state.salary}
                            placeholder='Expected Salary'
                        />
                        <label for='avatar'>Avatar</label>
                        <input
                            id='avatar'
                            type='file'
                            name='avatar'
                            onChange={this.handlerChangeAvatar}
                        />
                        <button type='submit' name='submit'>
                            Save
                        </button>
                    </form>
                </div>
            )
    }
}
