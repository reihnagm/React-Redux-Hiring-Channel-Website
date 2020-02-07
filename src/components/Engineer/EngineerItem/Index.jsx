import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../../images/default.png';
const EngineerItem = ({ item }) => {
    let avatar = item.avatar ? `http://localhost:5000/images/engineer/${item.avatar}` : defaultImage;
    return  (
        <Fragment>
            <div>
                <Link className='text-white' to={`engineer/profile/${item.slug}`}>
                    <img className='is-image is-rounded' src={avatar} alt={item.name} />
                    <div id='description-engineer'>
                        <p className='mb-3 sub-title'>{item.name}</p>
                        <div id='email-and-salary-container'>
                            <p className='mb-3'>{item.email}</p>
                            <p id='text-salary'>Expected Salary :
                                <span style={{ display: 'inline-block', marginLeft: '10px' }}> {item.salary} </span>
                            </p>
                        </div>
                        <p id='title-skill'>Skills :</p>
                        <ul>
                            <li> {item.skills} </li>
                        </ul>
                    </div>
                </Link>
            </div>
        </Fragment>
    )
}
export default EngineerItem;
