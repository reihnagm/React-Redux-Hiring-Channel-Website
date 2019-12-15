import React from 'react'

function EngineerList(props) {
    return (
        <div>
            {props.list.map(engineers => (
                <div key={engineers.id} className='box'>
                    <img src='https://media.tabloidbintang.com/files/thumb/tom-cruise_dok-hqwallpaper.jpg/745' alt='' />
                    <div className='profile-user'>
                        <h3 className='profile-name'>{engineers.name}</h3>
                        <h4 className='profile-salary'>Expected Salary {engineers.salary}</h4>
                        <h5 className='profile-email'>{engineers.email}</h5>
                        <h6 className='profile-title'>{engineers.title}</h6>
                        <ul>
                            <li>Skills :</li>
                            <li>{engineers.skill}</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}   

export default EngineerList