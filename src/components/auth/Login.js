import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    constructor() {
      super() 

      this.state = {
        name: '',
        password: '',
        role_id: ''
      }
    }

    onHandlerChange = (e) => {
      this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit = (e) => {
      e.preventDefault()  
      
    }
  
    render() {
      return (
        <div className='form-auth'>
        <h2>Login</h2>
        <form>
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <label>as</label>
          <select name='role_id'>
            <option value='1'>Engineer</option>
            <option value='2'>Company</option>
          </select>
          <button>Login</button>
        </form>
      </div>
      )
    }

}

