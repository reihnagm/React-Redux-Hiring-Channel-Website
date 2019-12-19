import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

class Engineer extends React.Component {

    constructor() {
        super()

        this.state = {
            engineers: [],
            loading: false,
            open: false,
            sort: '',
            total_data: 0,
            per_page: 0
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
                axios.delete(`http://3.90.152.67:5000/api/v1/engineers/${id}`)
                .then(res => {
                    Swal.fire('Yay!', res.data.message, 'success')
                })
                .catch(err => {
                    Swal.fire('Whoops!', err.response.data.message, 'success')
                })
            }
        })
    }

    fetch = (page = 1, search = '', sort = '') => {

        this.setState({
            sort
        })

        axios.get(`http://3.90.152.67:5000/api/v1/engineers?page=${page}&search=${search}&sort=${sort}`).then(res => {
            console.log(res)
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
    }

    render() {

        const { engineers, total_data, per_page, sort } = this.state

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
                                <img className='avatar-user' src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1981871a-1560281723.jpg?crop=0.586xw:0.878xh;0.243xw,0.122xh&resize=640:*' alt=""/>
                                <a id='username' href='#!' onClick={this.handleDropdownUsername}>
                                    Achmad
                                </a>
                                {this.state.open && (
                                    <div className='dropdown'>
                                        <ul>
                                            <Link className='engineer-create-link' to='engineer/create'>
                                                Create
                                            </Link>
                                        </ul>
                                    </div>
                                )}
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

                          <ul className='options-engineers'>
                            <a className='delete' href='#!' onClick={this.delete.bind(this, engineer.id)}>
                              Delete
                            </a>
                            <span> | </span>
                            <Link className='edit' to={`/engineer/${engineer.id}/edit`}> Edit </Link>
                          </ul>
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
