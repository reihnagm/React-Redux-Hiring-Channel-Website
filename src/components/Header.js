import React, { Component } from 'react'
import EngineerList from './engineers/EngineerList'
import axios from 'axios'

export default class Header extends Component { 

  constructor() {
    super() 
    
    this.state = {
      engineers: [], 
      loading: false,
      s: null 
    }
  }

  onSearch = e => {
    this.setState({ s: e.target.value, loading: true })

    axios.get(`http://localhost:3001/api/v1/engineers?search=${e.target.value}`)
    .then(res => {
        this.setState({ engineers: res.data.data, loading: false })
    }).catch(err => {
        this.setState({ loading: false })
    })
  }

 

  render() {

    let filteredEngineers = this.state.engineers.filter(engineer => {
        return engineer.skill.toLowerCase().indexOf(this.state.s) !== -1 || engineer.name.toLowerCase().indexOf(this.state.s) !== -1
    })

    return (
      <>
      <div className='header'>
        <a href='#!' className='logo'>
          <img src='/logo.png' alt='' />
        </a>

        <div className='searchbox'>
          <input className='input-search' type='text' value={this.state.s} onChange={this.onSearch} placeholder='Search' />
          <button className='btn-search icon-search' title='Search' />
        </div>

        <ul className='nav'>
          <li>
            <a href='#!'>Home</a>
          </li>
          <li id='divider-home-username'>
            <a href='#!'>Achmad</a>
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
          { !this.state.loading && <EngineerList engineers={filteredEngineers} /> }
      </div>
      </>
    )

}

}

