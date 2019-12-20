import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

class Engineer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            engineers: [],
            loading: false,
            open: false,
            loggedIn: false,
            sort: '',
            total_data: 0,
            per_page: 0,
            userId: 0,
            email: ''
        }

        this.delete = this.delete.bind(this)

    }

    handleDropdownUsername = () => {
        this.setState(state => {
            return {
                open: !state.open
            }
        })
    }

    delete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.value) {
                axios.delete(`http://3.90.152.67:5000/api/v1/engineers/${id}`).then(res => {
                    this.fetch()
                    return Swal.fire('Yay!', res.data.message, 'success')
                }).catch(err => {
                    return Swal.fire('Whoops!', err.response.data.message, 'success')
                })
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
                return Swal.fire('', '', 'success')
            }
        })
    }

    fetch = (page = 1, search = '', sort = '') => {

        this.setState({
            sort
        })

        axios.get(`http://3.90.152.67:5000/api/v1/engineers?page=${page}&search=${search}&sort=${sort}`).then(res => {
            this.setState({
                loading: false,
                engineers: res.data.data,
                total_data: res.data.total_data,
                per_page: res.data.per_page
            })
        }).catch(err => {
            console.log(err)
        })

    }

    componentDidMount()
    {
        this.fetch()

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

        } else {
            console.log('you are not logged in')
        }
    }

    render() {

        const { engineers, total_data, per_page, sort, email, userId } = this.state

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
                    <>
                        {this.state.open && (
                            <div className='dropdown'>
                                <ul>
                                    <Link className='engineer-create-link' to='engineer/create'>
                                        Create
                                    </Link>
                                </ul>
                            </div>
                        )}
                    </>
                )
            }
        }


        const checkPrivilege = (id, engineer_id) => {
            if(id === userId) {
                return(
                    <React.Fragment>

                      <ul className='options-engineers'>
                        <a className='delete' href='#!' onClick={this.delete.bind(this, engineer_id)}>
                          Delete
                        </a>
                        <span> | </span>
                        <Link className='edit' to={`/engineer/${engineer_id}/edit`}> Edit </Link>
                      </ul>

                    </React.Fragment>
                )
            }
        }

        const pagePagination = []

        if (total_data !== null)
        {
            for ( let i = 1; i <= Math.ceil(total_data / per_page); i++ )
            {
                pagePagination.push(i)
            }
        }

        const renderPageNumbers = pagePagination.map(number => {
            return (
                <span key={number} onClick={() =>
                        this.fetch(number, '', sort)
                    }>
                    {number}
                </span>
            )
        })

        return (
            <React.Fragment>

                <div className='header'>
                    <Link to='/' className='logo'>
                        <img src='/logo.png' alt='' />
                    </Link>

                    <div className='searchbox'>
                        <input
                            className='input-search'
                            type='text'
                            onChange={e => this.fetch(1, e.target.value, sort)}
                            placeholder='Search'
                        />
                        <button className='btn-search icon-search' title='Search' />
                    </div>

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

                <div className='sort'>
                    <ul>
                        <li>Sort by : <button onClick={() => { this.fetch(1, '', 'ASC')  }} className="btn-recently">Recently</button>  / <button onClick={() => { this.fetch(1, '', 'DESC')  }} className="btn-last-update">Last Update</button> </li>
                    </ul>
                </div>

                <div className='container'>
                    {engineers.map(engineer => (
                        <div key={engineer.id} className='box'>
                          <Link to={`engineer/${engineer.id}`}>
                            <img src={engineer.avatar} alt={engineer.name} />
                            <div className='profile-user'>
                              <h3 className='profile-name'>{engineer.name}</h3>
                              <h4 className='profile-salary'>
                                Expected Salary {engineer.salary}
                              </h4>
                              <h5 className='profile-email'>{engineer.email}</h5>
                              <h6 className='profile-title'>{engineer.title}</h6>
                              <ul>
                                <li>Skills :</li>
                                <li>{engineer.skill}</li>
                              </ul>
                            </div>
                          </Link>

                          { checkPrivilege(engineer.user_id, engineer.id) }

                        </div>
                    ))}
                </div>
                <ul className='pagination-container'>
                    <li> {renderPageNumbers} </li>
                </ul>
            </React.Fragment>
        )

    }

}



export default Engineer
