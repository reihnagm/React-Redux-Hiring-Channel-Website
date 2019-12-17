import React, { Component } from 'react'
import EngineerList from './engineers/EngineerList'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Header extends Component { 

  constructor() {
    super() 
    
    this.state = {
      engineers: [], 
      open: false,
      loading: false,
      filterText: '' 
    }
  }

  handleDropdownUsername = () => {
    this.setState(state => {
      return {
        open: !state.open,
      }
    })
  }

  onSearch = e => {
    this.setState({ search: e.target.value, loading: true })

    axios.get(`http://3.90.152.67:5000/api/v1/engineers?search=${e.target.value}`)
    .then(res => {
        this.setState({ engineers: res.data.data, loading: false })
    })
    .catch(err => {
        this.setState({ loading: false })
    })
  }

  render() {
    
    const filtered = this.state.engineers.filter(engineer => {
        return engineer.skill.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0  || engineer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0
    })
  
    return (
      <>
      <div className='header'>
        <Link to='/' className='logo'>
          <img src='/logo.png' alt='' />
        </Link>

        <div className='searchbox'>
          <input className='input-search' type='text' value={this.state.search} onChange={this.onSearch} placeholder='Search' />
          <button className='btn-search icon-search' title='Search' />
        </div>

        <ul className='nav'>
          <li>
            <Link to='/' className='home'>Home</Link>
          </li>
          <li id='divider-home-username'>
              <div className='dropdown-container'>
                <img className='avatar-user' src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1981871a-1560281723.jpg?crop=0.586xw:0.878xh;0.243xw,0.122xh&resize=640:*' />
                <a id="username" href='#!' onClick={this.handleDropdownUsername} >Achmad</a>
                {this.state.open && (
                  <div className='dropdown'>
                    <ul>
                      <Link>My Profile</Link>
                      <Link to='engineer/create'>Create</Link>
                    </ul>
                  </div>
                )}
              </div>
          </li>
          <li id='divider-message-notification'>
            <a href='#!' id='icon-message' className='icon-commenting' />
          </li>
          <li>
            <a href='#!' id='icon-bell1' className='icon-bell1' />
          </li>
        </ul>
      </div>
      
      <div className='container'>
          { this.state.loading && <p>Loading...</p> }
          { !this.state.loading && <EngineerList engineers={filtered} filterText={this.state.filterText} /> }
      </div>
      </>
    )

}

}

