import React, { Component } from 'react'
import Header from '../src/components/Header'
import Main from '../src/components/Main'
import './App.css'

export default class App extends Component {  
  
  constructor() {
    super()
  }


  render() {
      return (
        <>
          <Header />
          <Main />
        </>
      )
  }
 
}


