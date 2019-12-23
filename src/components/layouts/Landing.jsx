import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {

    return (
        <div className='container'>

            <header className='navbar has-small-vm'>
                <div className='column'>
                    <img src='./logo.png' alt="" id='logo' className='img-brand' />
                </div>

                <div className='column'>
                    <nav>
                        <Link id='engineers-link' to='/engineers'>Engineers</Link>/
                        <Link id='companies-link' to='/companies'>Companies</Link>
                    </nav>
                </div>
            </header>

            <div className='hero is-center is-info has-small-vm'>
                <div id='btn-wrapper-landing'>
                    <Link to='/register' className='button button-register-landing is-info is-rounded'>Sign Up</Link>
                    <Link to='/login' className='button button-login-landing is-info is-rounded'>Sign In</Link>
                </div>
            </div>

        </div>
    )

}

export default Landing
