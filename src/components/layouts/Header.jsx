import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import defaultImage from '../../images/default.png';
import logo from '../../images/logo.png';
import { logout } from '../../actions/auth';
import { getCurrentProfileCompany } from '../../actions/company';
import { getCurrentProfileEngineer } from '../../actions/engineer';
const Header = ({
        engineer,
        company,
        location,
        getCurrentProfileEngineer,
        getCurrentProfileCompany,
        logout,
        handleSearchEngineer,
        handleSearchCompany,
        searchEngineer,
        searchCompany,
        isAuthenticated,
        user
    }) => {
        const [visible, setVisible] = useState(false);
        const [nameEngineer, setNameEngineer] = useState('');
        const [avatarEngineer, setAvatarEngineer] = useState('');
        const [nameCompany, setNameCompany] = useState('');
        const [logoCompany, setLogoCompany] = useState('');
        let name_engineer = engineer && engineer.data && engineer.data.name;
        let avatar_engineer = engineer && engineer.data && engineer.data.avatar;
        let name_company = company && company.data && company.data.name;
        let logo_company = company && company.data && company.data.logo;
        useEffect(() => {
            const _fetchData = async () => {
                await getCurrentProfileEngineer();
                await getCurrentProfileCompany();
            }
            _fetchData();
            setNameEngineer(name_engineer);
            setAvatarEngineer(avatar_engineer);
            setNameCompany(name_company);
            setLogoCompany(logo_company);
        },[getCurrentProfileEngineer, getCurrentProfileCompany, name_engineer, name_company, avatar_engineer, logo_company]);
        const dropdownBtn = () => {
            setVisible(!visible)
        }
        let engineer_imageSource = avatar_engineer ? `http://localhost:5000/images/engineer/${avatar_engineer}`: defaultImage;
        let company_imageSource = logo_company ? `http://localhost:5000/images/company/${logo_company}`: defaultImage;
        let check_role_id = user && user.data && user.data.role_id;
        const CompaniesMenu = (
            <Fragment>
                <span className='mx-10'>  <img className='is-avatar' src={company_imageSource} /> </span>
                <span className='mx-10' onClick={(e) => dropdownBtn(e)}><a className='text-black' href='javascript:void(0);'> { nameCompany } </a></span>
                { visible &&
                    <ul id="dropdown-header">
                        <li><Link to={`companies`}>Companies</Link></li>
                        <li><Link to={`engineers`}>Engineers</Link></li>
                        <li><Link to={`company/profile`}>Profile</Link></li>
                        <li><Link to={`company/profile/me/edit`}>Edit Profile</Link></li>
                        <li><a onClick={logout} href="javascript:void(0);">Logout</a></li>
                    </ul>
                }
            </Fragment>
        )
        const EngineersMenu = (
            <Fragment>
                <span className='mx-10'> <img className='is-avatar' src={engineer_imageSource} /> </span>
                <span className='mx-10' onClick={(e) => dropdownBtn(e)}> <a className='text-black' href='javascript:void(0);'> { nameEngineer } </a> </span>
                { visible &&
                    <ul id='dropdown-header'>
                        <li><Link to={`companies`}>Companies</Link></li>
                        <li><Link to={`engineers`}>Engineers</Link></li>
                        <li><Link to={`engineer/profile`}>Profile</Link></li>
                        <li><Link to={`engineer/profile/me/edit`}>Edit Profile</Link></li>
                        <li><a onClick={logout} href="javascript:void(0);">Logout</a></li>
                    </ul>
                }
            </Fragment>
        )
        const Search = () => {
            if(check_role_id === 1 && location.pathname === "/engineers") {
                 return (
                    <div className='column is-half'>
                        <div className='field'>
                            <input
                                onChange={e => handleSearchEngineer(e)}
                                value={searchEngineer}
                                id='search-header'
                                placeholder='Search by Skill and Name here...'
                                name='search'
                                type='text'
                            />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className='column is-half'>
                        <div className='field'>
                            <input
                                onChange={e => handleSearchCompany(e)}
                                value={searchCompany}
                                id='search-header'
                                placeholder='Search by Name and Location here...'
                                name='search'
                                type='text'
                            />
                        </div>
                    </div>
                )
            }
        }
        const authLinks = (
            <header className='navbar is-shadow'>
                <img src={logo} alt='Logo' />
                { location.pathname !== "/" &&
                    <Search />
                }
                <ul className='is-relative'>
                    <li className='is-flex is-items-center'>
                        <span className='mx-10'> <Link className='text-black' to='/'>Home</Link> </span>
                        { user && user.data && user.data.role_id === 2 ? CompaniesMenu : EngineersMenu }
                    </li>
                </ul>
            </header>
        )
        const guestLinks = (
            <header className='navbar is-shadow'>
                <img src={logo} alt='Logo' />
                { location.pathname !== "/" &&
                    <Search />
                }
                <ul className='is-relative'>
                    <li className='is-flex is-items-center'>
                        <span className='mx-10'> <Link className='text-black'to='/'>Home</Link> </span>
                        <span className='mx-10'> <Link className='text-black'to='/companies'>Companies</Link> </span>
                        <span className='mx-10'> <Link className='text-black'to='/engineers'>Engineers</Link> </span>
                        <span className='mx-10' onClick={(e) => dropdownBtn(e)}> <a className='text-black' href="javascript:void(0);">Guest</a> </span>
                    </li>
                    { visible &&
                        <ul id="dropdown-header">
                            <li><Link to={`login`}>Login</Link></li>
                            <li><Link to={`register`}>Register</Link></li>
                        </ul>
                    }
                </ul>
            </header>
        )
        return (
            <Fragment>
                { isAuthenticated ? authLinks : guestLinks }
            </Fragment>
        )
    }
const mapStateToProps = state => ({
    engineer: state.engineer.engineer,
    company: state.company.company,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});
export default connect(
    mapStateToProps,
    { getCurrentProfileEngineer, getCurrentProfileCompany, logout }
)(withRouter(Header))
