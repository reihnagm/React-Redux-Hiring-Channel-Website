import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios'
import { addAvatar } from '../../actions/engineer'

const EngineerForm = () => {

    const [formAddEngineer, setFormAddEngineer] = useState({
        name: '',
        description: '',
        skill: '',
        location: '',
        birthdate: '',
        showcase: '',
        email: '',
        telephone: '',
        salary: ''
    });

    const [avatarAddEngineer, setAvatarAddEngineer] = useState({
        avatar: 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
    })

    const { name, description, skill, location, birthdate, showcase, email, telephone, salary } = formAddEngineer

    const { avatar } = avatarAddEngineer

    const onChange = e => setFormAddEngineer({ ...formAddEngineer, [e.target.name]: e.target.value });

    const onChangeAvatar = async e => {
        const files = Array.from(e.target.files)
        
        const formData = new FormData()

        files.forEach((file, i) => {
            formData.append(i, file)
        })

        const result = await axios.post('http://3.90.152.67/api/v1/engineers/upload-avatar', FormData)

        console.log(result)

    }

    return (
        <div className='has-small-vm'>

            <header className='navbar has-small-vm'>
                <div className='column'>
                    <img src='/logo.png' alt='Logo' />
                </div>
                <div className='column'>
                    <Link id='home-link' to='/'>Home</Link>
                </div>
            </header>

            <div className='columns is-justify-center'>
                <div className='column is-half'>
                    <div className='cards'>
                        <h3 id='title-add-engineer'>Add Form Engineer</h3>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={name} type='text' name='name' placeholder='Name'></input>
                        </div>
                        <div className='field'>
                            <textarea onChange={e => onChange(e)} value={description} name='description' placeholder='Description'></textarea>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={skill} type='text' name='skill' placeholder='Skill'></input>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={location} type='text' name='location' placeholder='Location'></input>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={birthdate} type='text' name='birthdate' placeholder='Birthdate'></input>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={showcase} type='text' name='showcase' placeholder='Showcase'></input>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={email} type='text' name='email' placeholder=' Email'></input>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={telephone} type='text' name='telephone' placeholder='Telephone'></input>
                        </div>
                        <div className='field'>
                            <input onChange={e => onChange(e)} value={salary} type='text' name='salary' placeholder='Salary' ></input>
                        </div>
                        <div className='field'>
                            <img src={avatar} alt='Avatar' />
                            <input id='avatar' onChange={e => onChangeAvatar(e)} type='file' name='avatar'></input>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}


export default connect(null, {})(EngineerForm)
