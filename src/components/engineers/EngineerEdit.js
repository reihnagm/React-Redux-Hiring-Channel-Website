import React, { Component } from 'react'
import axios from 'axios'

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

        const id = this.props.match.params.id

        const showcase = document.querySelector('#showcase-edit').files[0]
        const avatar = document.querySelector('#avatar-edit').files[0]

        let data = {
            name: this.state.name,
            description: this.state.description,
            skill: this.state.skill, 
            location: this.state.location,
            birthdate: this.state.birthdate,
            showcase: this.state.showcase,
            email: this.state.email,
            telephone: this.state.telephone,
            salary: this.state.salary,
            avatar: this.state.avatar
        }

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
            method: 'PATCH',
            url: `http://3.90.152.67:5000/api/v1/engineers/${id}`,
            data: formData, 
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
  
    }

    getData() {
        const id = this.props.match.params.id
        axios.get(`http://3.90.152.67:5000/api/v1/engineers/${id}`)
        .then(res => {
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
                    <input id='name' type='text' name='name' onChange={this.handlerChangeName} value={this.state.name} placeholder='Name'/>
                    <textarea id='description' name='description' onChange={this.handlerChangeDescription} value={this.state.description} placeholder='Description'></textarea>
                    <input id='skill' type='text' name='skill' onChange={this.handlerChangeSkill} value={this.state.skill} placeholder='Skill' />
                    <input id='location' type='text' name='location' onChange={this.handlerChangeLocation} value={this.state.location} placeholder='Location' />
                    <input id='birthdate' type='text' name='birthdate' onChange={this.handlerChangeBirthdate} value={this.state.birthdate} placeholder='Birthdate' />
                    <input id='showcase-edit' type='file' name='showcase' onChange={this.handlerChangeShowcase} />
                    <input id='email' type='email' name='email' onChange={this.handlerChangeEmail} placeholder='Email' value={this.state.email} /> 
                    <input id='telephone' type='number' name='telephone' onChange={this.handlerChangeTelephone} value={this.state.telephone} placeholder='Phone' />
                    <input id='salary' type='text' name='salary' onChange={this.handlerChangeSalary} value={this.state.salary} placeholder='Expected Salary' />
                    <input id='avatar-edit' type='file' name='avatar' onChange={this.handlerChangeAvatar} />
                    <button type='submit' name='submit'>Save</button> 
                </form> 
            </div>
        )
    }


    
}