import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    constructor() {
      super() 

      this.state = {
        email: '',
        password: '', 
        role_id: ''
      }
    }

    handlerChangeEmail = (e) => {
      this.setState({
        email: e.target.value,
      })
    }

    handlerChangePassword = (e) => {
      this.setState({
        password: e.target.value,
      })
    }

    handlerChangeRole = (e) => {
      this.setState({
        role_id: e.target.value,
      })
    }

    handlerSubmit = (e) => {
      e.preventDefault()  

      const data = {
        email: this.state.email,
        password: this.state.password, 
        role_id: this.state.role_id
      }
      
     axios.post(`http://3.90.152.67:5000/auth/login`, data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      }) 
    }
  
    render() {
      return (
        <div className='form-auth'>
          <h2>Login</h2>
          <form onSubmit={this.handlerSubmit}>
            <input type='email' name='email'  onChange={this.handlerChangeEmail} placeholder='Email' />
            <input type='password' name='password' onChange={this.handlerChangePassword} placeholder='Password' />
            <label>as</label>
            <select name='role_id' nChange={this.handlerChangeRole}>
              <option value='1'>Engineer</option>
              <option value='2'>Company</option>
            </select>
            <button>Login</button>
          </form>
        </div>
      )
    }

}

