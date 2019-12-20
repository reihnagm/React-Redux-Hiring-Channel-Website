import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export default class EngineerList extends Component {
  constructor (props) {
    super(props)

    this.delete = this.delete.bind(this)
  }

  delete (id) {
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
        axios
          .delete(`http://3.90.152.67:5000/api/v1/engineers/${id}`)
          .then(res => {
            Swal.fire('Yay!', res.data.message, 'success')
          })
          .catch(err => {
            Swal.fire('Whoops!', err.response.data.message, 'success')
          })
      }
    })
  }

  render () {
    const { engineers } = this.props

    return (
      <>
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
              <a href='#!' onClick={this.delete.bind(this, engineer.id)}>
                Delete
              </a>
              <span> | </span>
              <Link to={`/engineer/${engineer.id}/edit`}> Edit </Link>
            </ul>
          </div>
        ))}
      </>
    )
  }
}
