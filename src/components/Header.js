import React from 'react'
import logo from './logo.png'

function Header() {
    return (
        <div className="wrapper rel">
           
            <div className="header">
                <a href="#!" className="logo">
                    <img className="bl" src={logo} alt=""/>
                </a>    

                <div className="searchbox">
                    <input className="input-search" type="text" placeholder="Search"/>
                    <button className="btn-search icon-search" title="Search"></button>
                </div>      

                <ul className="nav">
                    <li>
                        <a href="#!">Home</a>
                    </li>
                    <li id="divider-home-username">    
                        <a href="#!">Achmad</a>
                    </li>
                    <li id="divider-message-notification">    
                        <a id="icon-message" className="icon-message-square" href="#!"></a>
                    </li>
                    <li>    
                        <a id="icon-bell" className="icon-bell" href="#!"></a>
                    </li>
                </ul>
            </div>
            
           
        </div>
    )
}

export default Header
  
