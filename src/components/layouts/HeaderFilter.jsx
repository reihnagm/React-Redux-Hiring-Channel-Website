import React, { Fragment } from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
const HeaderFilter = ({ handleSort, handleSortBy, handleLimit, sort, sortBy, limit }) => {
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
    return (
        <Fragment>
            <div className='has-small-vm'>
                <div className='columns'>
                    <div className='column'>
                        <div className='columns is-items-center is-justify-center'>
                            <p id='label-sortBy'>Sort By :</p>
                            <Dropdown options={optionsSortBy} value={sortBy} onChange={e => handleSortBy(e)} />
                        </div>
                    </div>
                    <div className='column'>
                        <div className='columns is-items-center is-justify-center'>
                            <p id='label-orderBy'>Sort :</p>
                            <Dropdown options={optionsOrderBy} value={sort} onChange={e => handleSort(e)}  />
                        </div>
                    </div>
                    <div className='column'>
                        <div className='columns is-items-center is-justify-center'>
                            <p id='label-showPage'>Show Page :</p>
                            <Dropdown options={optionsShowPage} value={limit} onChange={e => handleLimit(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default HeaderFilter;