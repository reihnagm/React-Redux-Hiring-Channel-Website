import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../../images/default.png';
const CompanyItem = ({ company }) => {
    let logo = company.logo ? `http://localhost:5000/images/company/${company.logo}` : defaultImage;
    return  (
        <Fragment>
            <div>
                <Link className='text-white' to={`company/profile/${company.slug}`}>
                    <img className='is-image is-rounded' src={logo} alt={ company.name } />
                    <div id='description-company'>
                        <p className='mb-3 sub-title'>{company.name}</p>
                        <p className='mb-3'>{company.email}</p>
                        <p id='text-location'>{company.location}</p>
                        <p id='text-description'>{ company.description ? company.description.substring(0, 150) + '...' : '' } </p>
                    </div>
                </Link>
            </div>
        </Fragment>
    )
}
export default CompanyItem;
