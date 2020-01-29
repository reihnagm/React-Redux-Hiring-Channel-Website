import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getEngineers } from '../../actions/engineer';
import Header from '../layouts/Header';
import HeaderFilter from '../layouts/HeaderFilter';
import Spinner from '../Spinner/Index';
import EngineerList from './EngineerList/Index';
class Engineer extends Component {
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
        await this.props.getEngineers();
    }
    handleSort = async (e) => {
        this.setState({
            sort: e.value
        });
        await this.props.getEngineers(this.state.search, e.value, this.state.sortBy, this.state.limit, this.state.page);
    }
    handleSortBy = async (e) => {
        this.setState({
            sortBy: e.value
        });
        await this.props.getEngineers(this.state.search, this.state.sort, e.value, this.state.limit, this.state.page);
    }
    handleLimit = async (e) => {
        this.setState({
            limit: e.value
        });
        await this.props.getEngineers(this.state.search, this.state.sort, this.state.sortBy, e.value, this.state.page);
        this.setState({
            loading: false
        });
    }
    handleSearch = async (e) => {
        this.setState({
            search: e.target.value
        });
        await this.props.getEngineers(e.target.value, this.state.sort, this.state.sortBy, this.state.limit, this.state.page);
        this.setState({
            loading: false
        });
    }
    handlePagination = async (url) => {
        this.setState({
            page: url
        });
        await this.props.getEngineers(this.state.search, this.state.sort, this.state.sortBy, this.state.limit, url);
    }
    render() {
        return  (
            <Fragment>
                <Header
                    handleSearchEngineer={this.handleSearch}
                    searchEngineer={this.state.search}
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
                    <EngineerList
                        engineers={this.props.engineers && this.props.engineers.data}
                        handlePagination={this.handlePagination}
                        nextPage={this.props.engineers && this.props.engineers.pageDetail && this.props.engineers.pageDetail.next_page}
                        prevPage={this.props.engineers && this.props.engineers.pageDetail && this.props.engineers.pageDetail.prev_page}
                    />
                )}
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    engineers: state.engineer.engineers,
    loading: state.engineer.loading,
    search: state.engineer.search,
    sort: state.engineer.sort,
    sortBy: state.engineer.sortBy,
    limit: state.engineer.limit,
    page: state.engineer.page,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(
    mapStateToProps,
    { getEngineers }
)(Engineer)
