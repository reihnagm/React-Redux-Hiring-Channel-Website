import React from 'react'
import { Link } from 'react-router-dom'

class MainHeader extends React.Component {

    constructor() {
        super()

        this.state = {
            open: false,
            engineers: [],
            search: ''
        }
    }

    handleDropdownUsername = () => {
        this.setState(state => {
            return {
                open: !state.open
            }
        })
    }

    render()  {
        return(
            <React.Fragment>
                <div className='header'>
                    <Link to='/' className='logo'>
                        <img src='/logo.png' alt='' />
                    </Link>

                    <div className='searchbox'>
                        <input
                            className='input-search'
                            type='text'
                            onChange={this.onSearch}
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
            </React.Fragment>
        )
    }
}

export default MainHeader
