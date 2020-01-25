import React, { Fragment, useState, useEffect } from 'react';
import defaultImage from '../../../images/default.png';
const EngineerItem = ({ engineer }) => {
    let avatar = engineer.avatar ? `http://localhost:5000/images/engineer/${engineer.avatar}` : defaultImage;
    return  (
        <Fragment>
            <img id='avatar-image' src={avatar} />
            <div id='description-engineer'>
                <p id='text-name'>{engineer.name}</p>
                <div id='email-and-salary-container'>
                    <p id='text-email'>{engineer.email}</p>
                    <p id='text-salary'>Expected Salary:
                        <span style={{ display: 'inline-block', marginLeft: '10px' }}> {engineer.salary} </span>
                    </p>
                </div>
                <p id='title-skill'>Skills :</p>
                <ul>
                    <li id='text-skill'>{ engineer.skill && engineer.skill.substring(0, 70)}...</li>
                </ul>
            </div>
        </Fragment>
    )
}
export default EngineerItem;
