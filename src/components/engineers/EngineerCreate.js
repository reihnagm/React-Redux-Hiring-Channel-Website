import React, { Component } from 'react'
import axios from 'axios'
  
export default class EngineerCreate extends Component {

    constructor() {
        super() 

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
            avatar: ''
        }
    }

    handlerChangeName = e => {
        this.setState({ 
            name: e.target.value,
        })
    }
    handlerChangeDescription = e => {
        this.setState({ 
            description: e.target.value,
        })
    }
    handlerChangeSkill = e => {
        this.setState({ 
            skill: e.target.value,
        })
    }
    handlerChangeLocation = e => {
        this.setState({ 
            location: e.target.value,
        })
    }
    handlerChangeBirthdate = e => {
        this.setState({ 
            birthdate: e.target.value,
        })
    }
    handlerChangeShowcase = e => {
        this.setState({ 
            showcase: e.target.value,
        })
    }
    handlerChangeEmail = e => {
        this.setState({ 
            email: e.target.value,
        })
    }
    handlerChangeTelephone = e => {
        this.setState({ 
            telephone: e.target.value,
        })
    }
    handlerChangeSalary = e => {
        this.setState({ 
            salary: e.target.value,
        })
    }
    handlerChangeAvatar = e => {
        this.setState({ 
            avatar: e.target.value,
        })
    }

    handlerSubmit = e => {
        e.preventDefault()

        const showcase = document.querySelector('#showcase').files[0]
        const avatar = document.querySelector('#avatar').files[0]

        let formData = new FormData()
        formData.set('name', this.state.name)
        formData.set('description', this.state.description)
        formData.set('skill', this.state.skill)
        formData.set('location', this.state.location)
        formData.set('birthdate', this.state.birthdate)
        formData.append('showcase', showcase)
        formData.set('email', this.state.email)
        formData.set('telephone', this.state.telephone)
        formData.set('salary', this.state.salary)
        formData.append('avatar', avatar)

        axios({
            method: 'POST',
            url: 'http://3.90.152.67:5000/api/v1/engineers', 
            data: formData, 
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {

        return (
            <div className='form-engineer'>
                <h2>Form Create Engineer</h2>
                <form onSubmit={this.handlerSubmit}>
                    <input id='name' type='text' name='name' onChange={this.handlerChangeName} placeholder='Name'/>
                    <textarea id='description' name='description' onChange={this.handlerChangeDescription} placeholder='Description'></textarea>
                    <input id='skill' type='text' name='skill' onChange={this.handlerChangeSkill} placeholder='Skill' />
                    <input id='location' type='text' name='location' onChange={this.handlerChangeLocation} placeholder='Location' />
                    <input id='birthdate' type='text' name='birthdate' onChange={this.handlerChangeBirthdate} placeholder='Birthdate' />
                    <label for='showcase'>Showcase</label>
                    <input id='showcase' type='file' name='showcase' onChange={this.handlerChangeShowcase} />
                    <input id='email' type='email' name='email' onChange={this.handlerChangeEmail} placeholder='Email' /> 
                    <input id='telephone' type='number' name='telephone' onChange={this.handlerChangeTelephone} placeholder='Phone' />
                    <input id='salary' type='text' name='salary' onChange={this.handlerChangeSalary} placeholder='Expected Salary' />
                    <label for='avatar'>Avatar</label>
                    <input id='avatar' type='file' name='avatar' onChange={this.handlerChangeAvatar} />
                    <button type='submit' name='submit'>Create Data</button> 
                </form> 
            </div>
        )
    }
}

