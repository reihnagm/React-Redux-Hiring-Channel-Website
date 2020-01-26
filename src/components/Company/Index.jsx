import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getCompanies } from '../../actions/company';
import Header from '../layouts/Header';
import HeaderFilter from '../layouts/HeaderFilter';
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
            page: props.page
        }
    }
    async UNSAFE_componentWillMount() {
        await this.props.getCompanies();
        this.setState({
            loading: false,
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
        return  (
            <Fragment>
                <Header
                    handleSearch={this.handleSearch}
                    search={this.state.search}
                />
                <HeaderFilter
                    handleSort={this.handleSort}
                    handleLimit={this.handleLimit}
                    handleSortBy={this.handleSortBy}
                    sort={this.state.sort}
                    sortBy={this.state.sortBy}
                    limit={this.state.limit}
                />
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
    page: state.company.page
})
export default connect(
    mapStateToProps,
    { getCompanies }
)(Company)
