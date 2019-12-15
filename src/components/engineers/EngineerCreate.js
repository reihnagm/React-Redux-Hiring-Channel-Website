import React, { Component } from 'react'
import axios from 'axios'

export default class EngineerCreate extends Component {

    constructor() {
        super() 

        this.state = {
            name: '', 
            description: '',
            skill: '',
            birthdate: '',
            location: '',
            showcase: ''
        }
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handlerSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://locahost:3000/api/v1/engineer', this.state)
    }

    render() {

        return (
            <div className='form-engineer'>
                <h2>Form Create Engineer</h2>
                <form onSubmit={this.handlerSubmit}>
                    <input id='name' type='text' name='name' onChange={this.handlerChange} placeholder='Name'/>
                    <input id='email' type='email' name='email' onChange={this.handlerChange} placeholder='Email'/>
                    <input id='telephone'  type='number' name='telephone' onChange={this.handlerChange} placeholder='Phone'/>
                    <textarea id='description' name='description' onChange={this.handlerChange} placeholder='Description'></textarea>
                    <input id='skill' type='text' name='skill' onChange={this.handlerChange} placeholder='Skill'/>
                    <input id='birthdate' type='text' name='birthdate' onChange={this.handlerChange} placeholder='Birhtdate'/>
                    <input id='location' name='location' onChange={this.handlerChange} placeholder='Location'/>
                    <input id='showcase' name='showcase' type='file' onChange={this.handlerChange} placeholder='Showcase'/>
                    <button type='submit' name='submit'>Save</button>
                </form> 
            </div>
        )
    }
}

