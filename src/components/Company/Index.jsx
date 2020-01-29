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
            search: props.search,
            sort: props.sort,
            sortBy: props.sortBy,
            limit: props.limit,
            page: props.page
        }
    }
    async componentDidMount() {
        await this.props.getCompanies();
    }
    handleSort = async (e) => {
        this.setState({
            sort: e.value
        });
        await this.props.getCompanies(this.state.search, e.value, this.state.sortBy, this.state.limit, this.state.page);
    }
    handleSortBy = async (e) => {
        this.setState({
            sortBy: e.value
        });
        await this.props.getCompanies(this.state.search, this.state.sort, e.value, this.state.limit, this.state.page);
    }
    handleLimit = async (e) => {
        this.setState({
            limit: e.value
        });
        await this.props.getCompanies(this.state.search, this.state.sort, this.state.sortBy, e.value, this.state.page);
    }
    handleSearch = async (e) => {
        this.setState({
            search: e.target.value
        });
        await this.props.getCompanies(e.target.value, this.state.sort, this.state.sortBy, this.state.limit, this.state.page);
    }
    handlePagination = async (url) => {
        this.setState({
            page: url
        });
        await this.props.getCompanies(this.state.search, this.state.sort, this.state.sortBy, this.state.limit, url);
    }
    render() {
        return  (
            <Fragment>
                <Header
                    handleSearchCompany={this.handleSearch}
                    searchCompany={this.state.search}
                />
                <HeaderFilter
                    handleSort={this.handleSort}
                    handleLimit={this.handleLimit}
                    handleSortBy={this.handleSortBy}
                    sort={this.state.sort}
                    sortBy={this.state.sortBy}
                    limit={this.state.limit}
                />
                {this.props.loading ? (<Spinner />) : (
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
