import React from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

class MainHeader extends React.Component {

    constructor() {
        super()

        this.state = {
            email: ''
        }
    }

    handleDropdownUsername = () => {
        this.setState(state => {
            return {
                open: !state.open
            }
        })
    }

    logout = () => {
        Swal.fire({
            title: 'Are you sure want to logout?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(result => {
            if (result.value) {
                localStorage.removeItem('token')
                window.location.reload()
            }
        })
    }

    componentDidMount() {
        if(localStorage.getItem('token'))
        {
            let base64Url = localStorage.getItem('token').split('.')[1]
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            let payload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)}).join('')
            )

            let user = JSON.parse(payload)
            let id = user.id
            let email = user.email

            this.setState({
                userId: id,
                email
            })

            console.log(id)

        } else {
            console.log('you are not logged in')
        }
    }

    render()  {

        const  { email } = this.state

        const checkUser = () => {
            if(email) {
                return (
                    <a id='username' href='#!' onClick={this.handleDropdownUsername}>
                        { email.substr(0, 10) }
                    </a>
                )
            }
            else
            {
                return (
                    <React.Fragment>
                        &nbsp;&nbsp;
                        <Link className='login' to='/login'>Login</Link>
                        &nbsp;&nbsp;
                        <Link className='register' to='/register'>Register</Link>
                    </React.Fragment>
                )
            }
        }

        const checkLoggedin = () => {
            if(email) {
                return (
                    <React.Fragment>
                        {this.state.open && (
                            <div className='dropdown'>
                                <ul>
                                    <Link className='engineer-create-link' to='/engineer/create'>
                                        Create
                                    </Link>
                                </ul>
                                <ul>
                                    <Link className='engineer-create-link' to='/engineer'>
                                        Engineer
                                    </Link>
                                </ul>
                                <ul>
                                    <a href='#!' className='logout' onClick={this.logout}>
                                        Logout
                                    </a>
                                </ul>
                            </div>
                        )}
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        {this.state.open && (
                            <div className='dropdown'>
                                <ul>
                                    <Link className='engineer-create-link' to='engineer/create'>
                                        Create
                                    </Link>
                                </ul>
                            </div>
                        )}
                    </React.Fragment>
                )
            }
        }


        return(
            <React.Fragment>
                <div className='header'>
                    <Link to='/' className='logo'>
                        <img src='/logo.png' alt='' />
                    </Link>

                    <ul className='nav'>
                        <li>
                            <Link to='/' className='home'>
                                Home
                            </Link>
                        </li>
                        <li id='divider-home-username'>
                            <div className='dropdown-container'>
                                <img className='avatar-user' src='https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' alt=""/>
                                { checkUser() }
                                { checkLoggedin() }
                            </div>
                        </li>
                        <li id='divider-message-notification'>
                            <span id='icon-message' className='icon-commenting' />
                        </li>
                        <li>
                            <span id='icon-bell1' className='icon-bell1' />
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default MainHeader
