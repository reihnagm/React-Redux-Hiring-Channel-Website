import React from 'react'

function Header () {
  return (
    <div className='container'>

      <div className='header'>
        <a href='#!' className='logo'>
          <img src='/logo.png' alt='' />
        </a>

        <div className='searchbox'>
          <input className='input-search' type='text' placeholder='Search' />
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

    </div>
  )
}

export default Header
