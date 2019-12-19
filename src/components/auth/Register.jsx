import React, { Component } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

export default class Register extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      role_id: 1
    }
  }

  handlerChangeEmail = e => {
    this.setState({
      email: e.target.value
    })
  }

  handlerChangePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  handlerChangeRole = e => {
    this.setState({
      role_id: e.target.value
    })
  }

  handlerSubmit = e => {
    e.preventDefault()

    const data = {
        email: this.state.email,
        password: this.state.password,
        role_id: parseInt(this.state.role_id)
    }

    axios.post(`http://3.90.152.67:5000/auth/register`, data).then(res => {
            Swal.fire({
                title: 'Yay!',
                text: res.data.message,
                icon: 'success'
            })
            localStorage.setItem('token', res.data.token)
        })
        .catch(err => {
            Swal.fire({
                title: 'Whoops!',
                text: err.response.data.message,
                icon: 'error'
            })
        })
    }

  render() {
    return (
      <div className='form-auth'>
        <h2>Register</h2>
        <form onSubmit={this.handlerSubmit}>
          <input
            type='email'
            name='email'
            onChange={this.handlerChangeEmail}
            placeholder='Email'
          />
          <input
            type='password'
            name='password'
            onChange={this.handlerChangePassword}
            placeholder='Password'
          />
          <select name='role_id' onChange={this.handlerChangeRole}>
            <option value='1'>Engineer</option>
            <option value='2'>Company</option>
          </select>
          <button>Register</button>
        </form>
      </div>
    )
  }
}
