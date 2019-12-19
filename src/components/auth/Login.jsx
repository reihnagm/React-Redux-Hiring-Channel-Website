import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'


class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            role_id: 1,
            show: true
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

  handleRole = e => {
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

    axios.post(`http://3.90.152.67:5000/auth/login`, data).then(res => {

        console.log(res)
        Swal.fire({
            title: 'Yay!',
            text: res.data.message,
            icon: 'success'
        })
            localStorage.setItem('token', res.data.token)

            if(res.data.data[0].role_id === 1) {
                this.props.history.push("/engineer")
            } else if(res.data.data[0].role_id === 2) {
                this.props.history.push("/company")
            }
            
        })
        .catch(err => {
            localStorage.removeItem('token')

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
            <h2>Login</h2>
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
                <label>as</label>
                <select name='role_id' onChange={this.handleRole}>
                    <option value='1'>Engineer</option>
                    <option value='2'>Company</option>
                </select>
                <button>Login</button>
            </form>
        </div>
    )
  }
}

export default Login
