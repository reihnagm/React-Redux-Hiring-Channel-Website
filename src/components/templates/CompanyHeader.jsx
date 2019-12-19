import React from 'react'
import { Link } from 'react-router-dom'

class CompanyHeader extends React.Component {

    constructor() {
        super()

        this.state = {
            open: false
        }
    }

    handleDropdownUsername = () => {
        this.setState(state => {
            return {
                open: !state.open
            }
        })
    }


    render() {
        return (
            <React.fragment>
                <div className='header'>
                    <Link to='/' className='logo'>
                        <img src='/logo.png' alt='' />
                    </Link>

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
            </React.fragment>
        )
    }
}

export default CompanyHeader
