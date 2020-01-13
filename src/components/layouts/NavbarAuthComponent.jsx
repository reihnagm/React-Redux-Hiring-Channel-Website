import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NavbarAuthComponent =  ({ user })  => {

    let avatar = user.avatar === null ? 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg' :
    `http://localhost:5000/images/engineer/${user.avatar}`

    return (
        <>
            <ul id="header-menu">
                <li><Link to='/'>Home</Link></li>
                <li id='display-username'>
                    <img id='small-avatar' src={avatar}/>
                    <Link id='username-link' to='/'>{user.name}</Link>
                    <ul id="sub-header-menu">
                        <li>
                            <Link to={`engineer/profile`}> Profile </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default NavbarAuthComponent
