import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Company extends React.Component {

    constructor() {
        super()

        this.state = {
            companies: []
        }
    }

    fetch = () => {
        axios.get(`http://3.90.152.67:5000/api/v1/companies`).then(res => {
            this.setState({
                companies : res.data.result
            })
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.fetch()
    }

    render() {

        const { companies } = this.state

        return (
            <React.Fragment>



                <div className='container'>
                    {companies.map(company => (
                        <div key={company.id} className='box'>
                            <Link to={`company/${company.id}`}>
                                <img src={company.logo} alt={company.name} />
                                    <div className='profile-user'>
                                        <h3 className='profile-name'>{company.name}</h3>
                                        <h4 className='profile-salary'>{company.location}</h4>
                                        <h5 className='profile-email'>{company.description}</h5>
                                        <h6 className='profile-title'>{company.email}</h6>
                                        <br />
                                        <p>Phone : {company.telephone}</p>
                                    </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

export default Company
