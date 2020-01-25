import React, { Fragment, useState, useEffect } from 'react';
import defaultImage from '../../../images/default.png';
const CompanyItem = ({ company }) => {
    let logo = company.logo ? `http://localhost:5000/images/company/${company.logo}` : defaultImage;
    return  (
        <Fragment>
            <img id='avatar-image' src={logo} />
            <div id='description-company'>
                <p id='text-name'>{company.name}</p>
                <p id='text-email'>{company.email}</p>
                <p id='text-location'>{company.location}</p>
                <p id='text-description'>{ company.description ? company.description.substring(0, 150) + '...' : '' } </p>
            </div>
        </Fragment>
    )
}
export default CompanyItem;
