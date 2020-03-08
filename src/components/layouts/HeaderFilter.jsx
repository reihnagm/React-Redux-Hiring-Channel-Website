import React, { useEffect, useCallback } from 'react';
import 'react-dropdown/style.css';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
const HeaderFilter = ({
    handleSortBy,
    handleSort,
    handleLimit,
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
    const path = location.pathname;
    let optionsSortByE = [
        { value: 'date_updated', label: 'Date Updated' },
        { value: 'name', label : 'Name' },
        { value: 'skills', label : 'Skills'}
    ];
    let optionsOrderBy = [
        { value: 'DESC', label: 'Newer'},
        { value: 'ASC', label: 'Older' }
    ];
    let optionsShowPage = [
        { value: '5', label: '5'   },
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '30', label: '30' }
    ];
    let optionsSortByC = [
        { value: 'date_updated', label: 'Date Updated' },
        { value: 'name', label : 'Name' },
        { value: 'location', label : 'Location'}
    ];
    const getFilter = useCallback(() => {
        if(path === "/engineers") {
            setSortBy(optionsSortByE[0]);
            setSort(optionsOrderBy[0]);
            setLimit(optionsShowPage[0]);
        }
        if(path === "/companies") {
            setSortBy(optionsSortByC[0]);
            setSort(optionsOrderBy[0]);
            setLimit(optionsShowPage[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        getFilter();
    },[getFilter]);
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
