import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class EngineerList extends Component {
  
  constructor(props) {
    super(props)  

    this.delete = this.delete.bind(this);
  }

  delete(id){
    axios.delete(`http://3.90.152.67:5000/api/v1/engineers/${id}`).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
 
  render() {


    const { engineers, filterText } = this.props

    return (
        <>
          { engineers
            .filter(engineer => {
              return engineer.skill.toLowerCase().indexOf(filterText) >= 0 || engineer.name.toLowerCase().indexOf(filterText) >= 0
            })
            .map(engineer => (
            <div key={engineer.id} className='box'>
              <img src={engineer.avatar} alt={engineer.name} />
              <div className='profile-user'>
                <h3 className='profile-name'>{engineer.name}</h3>
                <h4 className='profile-salary'>Expected Salary {engineer.salary}</h4>
                <h5 className='profile-email'>{engineer.email}</h5>
                <h6 className='profile-title'>{engineer.title}</h6>
                <ul>
                  <li>Skills :</li>
                  <li>{engineer.skill}</li>
                </ul>
              </div>

              <ul className='options-engineers'>
                <li onClick={this.delete.bind(this, engineer.id)}> Delete </li>
                <span> | </span>
                <Link to={`/engineer/${engineer.id}/edit`}> Edit </Link>
              </ul> 
            </div>
          ))}
        </> 
    )
  }
}

