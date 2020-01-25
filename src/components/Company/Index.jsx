import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfileEngineer } from '../../actions/engineer';
import { getCompanies, getCurrentProfileCompany } from '../../actions/company';
import { logout } from '../../actions/auth';
import { Link } from 'react-router-dom';
import defaultImage from '../../images/default.png';
import logo from '../../images/logo.png';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import Spinner from '../Spinner/Index';
import CompanyList from './CompanyList/Index';
class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            search: props.search,
            sort: props.sort,
            sortBy: props.sortBy,
            limit: props.limit,
            page: props.page,
            name_company: '',
            logo_company: '',
            name_engineer: '',
            avatar_engineer: ''
        }
    }
    async UNSAFE_componentWillMount() {
        await this.props.getCompanies();
        await this.props.getCurrentProfileCompany();
        await this.props.getCurrentProfileEngineer();
        this.setState({
            loading: false,
            name_company: this.props.company && this.props.company.data && this.props.company.data.name,
            logo_company: this.props.company && this.props.company.data && this.props.company.data.logo,
            name_engineer: this.props.engineer && this.props.engineer.data && this.props.engineer.data.name,
            avatar_engineer: this.props.engineer && this.props.engineer.data && this.props.engineer.data.avatar
        });
    }
    handleSort = async (e) => {
        this.setState({
            loading: true,
            sort: e.value
        });
        await this.props.getCompanies(this.state.search, e.value, this.state.sortBy, this.state.limit, this.state.page);
        this.setState({
            loading: false
        });
    }
    handleSortBy = async (e) => {
        this.setState({
            loading: true,
            sortBy: e.value
        });
        await this.props.getCompanies(this.state.search, this.state.sort, e.value, this.state.limit, this.state.page);
        this.setState({
            loading: false
        });
    }
    handleLimit = async (e) => {
        this.setState({
            loading: true,
            limit: e.value
        });
        await this.props.getCompanies(this.state.search, this.state.sort, this.state.sortBy, e.value, this.state.page);
        this.setState({
            loading: false
        });
    }
    handleSearch = async (e) => {
        this.setState({
            loading: true,
            search: e.target.value
        });
        await this.props.getCompanies(e.target.value, this.state.sort, this.state.sortBy, this.state.limit, this.state.page);
        this.setState({
            loading: false
        });
    }
    handlePagination = async (url) => {
        this.setState({
            loading: true,
            page: url
        });
        await this.props.getCompanies(this.state.search, this.state.sort, this.state.sortBy, this.state.limit, url);
        this.setState({
            loading: false
        });
    }
    render() {
        const { name_company, logo_company, name_engineer, avatar_engineer } = this.state;
        let company_imageSource = logo_company ? `http://localhost:5000/images/company/${logo_company}` : defaultImage;
        let engineer_imageSource = avatar_engineer ? `http://localhost:5000/images/engineer/${avatar_engineer}` : defaultImage;
        const optionsSortBy = [
            { value: 'date_updated', label: 'Date Updated' },
            { value: 'name', label : 'Name' },
            { value: 'skill', label : 'Skill'}
        ]
        const optionsOrderBy = [
            { value: 'DESC', label: 'Newer'},
            { value: 'ASC', label: 'Older' }
        ]
        const optionsShowPage = [
            { value: '5', label: '5'   },
            { value: '10', label: '10' },
            { value: '20', label: '20' },
            { value: '30', label: '30' }
        ]
        const CompaniesMenu = (
            <Fragment>
                <li id="display-username">
                    <img id="small-avatar" src={company_imageSource}/>
                    <Link id="username-link" to='/'>{name_company}</Link>
                    <ul id="sub-header-menu">
                        <li><Link to={`engineers`}>Engineers</Link></li>
                        <li><Link to={`company/profile`}>Profile</Link></li>
                        <li><Link to={`company/profile/edit`}>Edit Profile</Link></li>
                        <li><a onClick={this.props.logout} href="javascript:void(0);">Logout</a></li>
                    </ul>
                </li>
            </Fragment>
        )
        const EngineersMenu = (
            <Fragment>
                <li id="display-username">
                    <img id="small-avatar" src={engineer_imageSource}/>
                    <Link id="username-link" to='/'>{name_engineer}</Link>
                    <ul id="sub-header-menu">
                        <li><Link to={`companies`}>Companies</Link></li>
                        <li><Link to={`engineer/profile`}>Profile</Link></li>
                        <li><Link to={`engineer/profile/edit`}>Edit Profile</Link></li>
                        <li><a onClick={this.props.logout} href="javascript:void(0);">Logout</a></li>
                    </ul>
                </li>
            </Fragment>
        )
        const authLinks = (
            <header id='header' className='navbar'>
                <img id='logo' src={logo} alt='Logo' />
                <div className='column is-half'>
                    <div className='field'>
                        <input
                            onChange={e => this.handleSearch(e)}
                            value={this.state.search}
                            id='search-header'
                            placeholder='Search by Location and Name here...'
                            name='search'
                            type='text'
                        />
                    </div>
                </div>
                <ul id="header-menu">
                    <li> <Link to='/'>Home</Link> </li>
                        { this.props.user && this.props.user.data && this.props.user.data.role_id === 2 ? CompaniesMenu : EngineersMenu }
                </ul>
            </header>
        )
        const guestLinks = (
            <header id='header' className='navbar'>
                <img id='logo' src={logo} alt='Logo' />
                <div className='column is-half'>
                    <div className='field'>
                        <input
                            onChange={e => this.handleSearch(e)}
                            type='text'
                            value={this.state.search} id='search-header'
                            placeholder='Search by Location and Name here...'
                            name='search'
                        />
                    </div>
                </div>
                <ul id="header-menu">
                    <li><Link to='/'>Home</Link></li>
                    <li id="display-username">
                        <img id="small-avatar" src={defaultImage}/>
                        <li><Link id="username-link" to='/'>Guest</Link></li>
                        <ul id="sub-header-menu">
                            <li><Link to={`login`}>Login</Link></li>
                            <li><Link to={`register`}>Register</Link></li>
                        </ul>
                    </li>
                </ul>
            </header>
        )
        return  (
            <Fragment>
                { this.props.isAuthenticated ? authLinks : guestLinks }
                <div id='sort'>
                    <div className='columns'>
                        <div className='column'>
                            <div className='columns is-items-center is-justify-center'>
                                <p id='label-sortBy'>Sort By :</p>
                                <Dropdown options={optionsSortBy} value={this.state.sortBy} onChange={e => this.handleSortBy(e)} />
                            </div>
                        </div>
                        <div className='column'>
                            <div className='columns is-items-center is-justify-center'>
                                <p id='label-orderBy'>Sort :</p>
                                <Dropdown options={optionsOrderBy} value={this.state.sort} onChange={e => this.handleSort(e)}  />
                            </div>
                        </div>
                        <div className='column'>
                            <div className='columns is-items-center is-justify-center'>
                                <p id='label-showPage'>Show Page :</p>
                                <Dropdown options={optionsShowPage} value={this.state.limit} onChange={e => this.handleLimit(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.loading ? (<Spinner />) : (
                    <CompanyList
                        companies={this.props.companies && this.props.companies.data}
                        handlePagination={this.handlePagination}
                        nextPage={this.props.companies && this.props.companies.pageDetail && this.props.companies.pageDetail.next_page}
                        prevPage={this.props.companies && this.props.companies.pageDetail && this.props.companies.pageDetail.prev_page}
                    />
                )}
            </Fragment >
        )
    }
}
const mapStateToProps = state => ({
    companies: state.company.companies,
    company: state.company.company,
    engineer: state.engineer.engineer,
    user: state.auth.user,
    loading: state.company.loading,
    search: state.company.search,
    sort: state.company.sort,
    sortBy: state.company.sortBy,
    limit: state.company.limit,
    page: state.company.page,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(
    mapStateToProps,
    { getCompanies, getCurrentProfileCompany, getCurrentProfileEngineer, logout }
)(Company)
