import React, {Component} from 'react'
import axios from 'axios'

import EngineerList from './EngineerList'

export default class Engineer extends Component {
   constructor() {
     super() 

     this.state = {
        engineers: []
     }
   }

   componentDidMount() {
      axios.get('http://localhost:3001/api/v1/engineers').then(res => {
        this.setState({ engineers: res.data.data })
      }).catch(err => {
        console.log(err)
      })
   }
     
   render() {

    const { engineers } = this.state

     return (
        <div className='container'>
          { <EngineerList list={this.state.engineers} /> }
        </div>
     )
   }
} 
