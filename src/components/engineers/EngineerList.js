import React from 'react'

const EngineersList = (props) => {
  return (
    <>
      {props.engineers.map(engineer => (
        <div key={engineer.id} className='box'>
          <img src={engineer.avatar} alt={engineer.name} />
          <div className='profile-user'>
            <h3 className='profile-name'>{engineer.name}</h3>
            <h4 className='profile-salary'>Expected Salary {engineer.salary}</h4>
            <h5 className='profile-email'>{engineer.email}</h5>
            <h6 className='profile-title'>{engineer.title}</h6>
            <ul>
              <li>Skills :</li>
              <li>{engineer.skill}</li>
            </ul>
          </div>
        </div>
      ))}
    </>
  )
}

export default EngineersList
