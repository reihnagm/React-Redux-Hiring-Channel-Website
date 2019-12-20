import React, { Component } from 'react'
import MainHeader from '../templates/MainHeader'
import axios from 'axios'

export default class EngineerSingle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      skill: '',
      location: '',
      birthdate: '',
      showcase: '',
      email: '',
      telephone: '',
      salary: '',
      avatar: ''
    }
  }

  getData () {
    const id = this.props.match.params.id

    axios.get(`http://3.90.152.67:5000/api/v1/engineers/${id}`)
      .then(res => {
        this.setState({
          name: res.data.data[0].name,
          description: res.data.data[0].description,
          skill: res.data.data[0].skill,
          location: res.data.data[0].location,
          birthdate: res.data.data[0].date_of_birth,
          showcase: res.data.data[0].showcase,
          email: res.data.data[0].email,
          telephone: res.data.data[0].telephone,
          salary: res.data.data[0].salary,
          avatar: res.data.data[0].avatar
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    const {
      name,
      description,
      skill,
      location,
      birthdate,
      showcase,
      email,
      telephone,
      salary,
      avatar
    } = this.state

    return (
      <React.Fragment>

        <MainHeader />

        <div id='engineer-single'>
          <img id='avatar-engineer-single' src={avatar} alt={name} />
          <h2 id='name-engineer-single'>&nbsp; {name}</h2>
          <p id='description-engineer-single'>&nbsp; {description}</p>
          <p id='label-skills-engineer-single'>Skills:</p>
          <p id='skills-engineer-single'>{skill}</p>
          <p id='location-engineer-single'>
            <span id='label-location-engineer-single'> Location: </span>
            &nbsp; {location}
          </p>
          <p id='birthdate-engineer-single'>
            <span id='label-birthdate-engineer-single'> Birthdate: </span>
            &nbsp; {birthdate}
          </p>
          <img src={showcase} id='showcase-engineer-single' alt={name} />
          <p id='email-engineer-single'>
            <span id='label-email-engineer-single'> Email:</span>
            &nbsp; {email}
          </p>
          <p id='phone-engineer-single'>
            <span id='label-telephone-engineer-single'> Telephone:</span>
            &nbsp; {telephone}
          </p>

          <p id='salary-engineer-single'>
            <span id='label-salary-engineer-single'> Expected Salary </span>
             : &nbsp;  {salary}
          </p>
        </div>
    </React.Fragment>
    )
  }
}
