import React, { useEffect } from 'react';
import 'react-dropdown/style.css';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
const HeaderFilter = ({
    handleSearch,
    handleSortBy,
    handleSort,
    handleLimit,
    querySearch,
    setSortBy,
    setSort,
    setLimit,
    sortByE,
    sortE,
    limitE,
    sortByC,
    sortC,
    limitC,
    location
}) => {
    let optionsSortByE = [];
    let optionsSortByC = [];
    let optionsOrderBy = [];
    let optionsShowPage = [];
    optionsSortByC = [
        { value: 'date_updated', label: 'Date Updated' },
        { value: 'name', label : 'Name' },
        { value: 'location', label : 'Location'}
    ];
    optionsSortByE = [
        { value: 'date_updated', label: 'Date Updated' },
        { value: 'name', label : 'Name' },
        { value: 'skills', label : 'Skills'}
    ];
    optionsOrderBy = [
        { value: 'DESC', label: 'Newer'},
        { value: 'ASC', label: 'Older' }
    ];
    optionsShowPage = [
        { value: '5', label: '5'   },
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '30', label: '30' }
    ];
    useEffect(() => {
        if(location.pathname === "/engineers") {
            setSortBy(optionsSortByE[0]);
            setSort(optionsOrderBy[0]);
            setLimit(optionsShowPage[0]);
        }
        if(location.pathname === "/companies") {
            setSortBy(optionsSortByC[0]);
            setSort(optionsOrderBy[0]);
            setLimit(optionsShowPage[0]);
        }
    },[]);
    return (
        <>
            <div className="my-5">
                <div className="columns">
                    <div className="column">
                        <div className="columns items-center justify-center">
                            <p className="mx-2">Sort By</p>
                            { location.pathname === "/engineers" &&
                                <Dropdown
                                    options={optionsSortByE}
                                    value={sortByE}
                                    onChange={element => handleSortBy(element.value)}
                                />
                            }
                            { location.pathname === "/companies" &&
                                <Dropdown
                                    options={optionsSortByC}
                                    value={sortByC}
                                    onChange={element => handleSortBy(element.value)}
                                />
                            }
                        </div>
                    </div>
                    <div className="column">
                        <div className="columns items-center justify-center">
                            <p className="mx-2">Sort</p>
                            { location.pathname === "/engineers" &&
                                <Dropdown
                                    options={optionsOrderBy}
                                    value={sortE}
                                    onChange={element => handleSort(element.value)}
                                />
                            }
                            { location.pathname === "/companies" &&
                                <Dropdown
                                    options={optionsOrderBy}
                                    value={sortC}
                                    onChange={element => handleSort(element.value)}
                                />
                            }
                        </div>
                    </div>
                    <div className="column">
                        <div className="columns items-center justify-center">
                            <p className="mx-2">Show Page</p>
                            { location.pathname === "/engineers" &&
                                <Dropdown
                                    options={optionsShowPage}
                                    value={limitE}
                                    onChange={element => handleLimit(element.value)}
                                />
                            }
                            { location.pathname === "/companies" &&
                                <Dropdown
                                    options={optionsShowPage}
                                    value={limitC}
                                    onChange={element => handleLimit(element.value)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default (withRouter(HeaderFilter));
