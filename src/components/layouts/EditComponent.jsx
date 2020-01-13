import React, { useState, Fragment } from 'react'

const EditComponent = (props) => {
    
    // const [avatar, setAvatar] = useState(props.data.avatar)
    // const [name, setName] = useState(props.data.name)
    // const [email, setEmail] = useState(props.data.email)
    // const [description, setDescription] = useState(props.data.description)
    // const [skill, setSkill] = useState(props.data.skill)
    // const [location, setLocation] = useState(props.data.location)
    // const [showcase, setShowcase] = useState(props.data.showcase)
    // const [birhtdate, setBirthdate] = useState(props.data.birthdate)
    // const [salary, setSalary] = useState(props.data.salary)
    //
    // const onChangeName = (event) => {
    //     setName(event.target.value)
    // }
    // const onChangeDescription = (event) => {
    //     setDescription(event.target.value)
    // }
    // const onChangeSkill = (event) => {
    //     setSkill(event.target.value)
    // }
    // const onChangeLocation = (event) => {
    //     setLocation(event.target.value)
    // }
    // const onChangeTelephone = (event) => {
    //     setTelephone(event.target.value)
    // }
    // const updateEngineer = (event) => {
    //
    // }

    return (
      {/* <Fragment>
            <div className='columns is-justify-center'>
               <div className='column is-half'>
                   <div className='cards'>
                       <h3 id='title-update-engineer'>Update Engineer</h3>
                       <form onSubmit={ e => updateEngineer(e) }>
                           <div className='field'>
                               <label> Name </label>
                               <input
                                   onChange={e => onChange(e)}
                                   value={name}
                                   name='name'
                                   placeholder='Name'>
                               </input>
                           </div>
                           <div className='field'>
                               <label> E-mail Address </label>
                               <input
                                   disabled
                                   onChange={e => onChange(e)}
                                   value={email}
                                   name='email'
                                   placeholder='E-mail Address'>
                               </input>
                           </div>
                           <div className='field'>
                               <label> Description </label>
                               <textarea
                                   onChange={e => onChange(e)}
                                   value={description}
                                   name='description'
                                   placeholder='Description'>
                               </textarea>
                           </div>
                           <div className='field'>
                               <label> Skill </label>
                               <input
                                   onChange={e => onChange(e)}
                                   value={skill}
                                   type='text'
                                   name='skill'
                                   placeholder='Skill'>
                               </input>
                           </div>
                           <div className='field'>
                               <label> Location </label>
                               <input
                                   onChange={e => onChange(e)}
                                   value={location}
                                   type='text'
                                   name='location'
                                   placeholder='Location'>
                               </input>
                           </div>
                           <div className='field'>
                               <label> Birthdate </label>
                               <DatePicker
                                   onChange={e => onChangeBirthdate(e)}
                                   selected={birthdate}
                                   dateFormat='yyyy-MM-dd'
                                />
                           </div>
                           <div className='field'>
                               <label> Showcase </label>
                               <input
                                   onChange={e => onChange(e)}
                                   value={showcase}
                                   type='text'
                                   name='showcase'
                                   placeholder='Showcase'>
                               </input>
                           </div>
                           <div className='field'>
                               <label> Telephone </label>
                               <InputMask
                                   onChange={e => onChange(e)}
                                   name='telephone'
                                   type='text'
                                   value={telephone}
                                   placeholder='Enter phone number'
                               />
                           </div>
                           <div className='field'>
                               <label> Avatar </label>
                               <img style={{ display:'block', margin: '30px auto', width: '120px' }} src={avatar} />
                               <input id='avatar' type='file' onChange={e => onChangeAvatar(e)}/>
                           </div>
                           <div className='field'>
                               <label> Salary </label>
                               <InputMask
                                   onChange={e => onChange(e)}
                                   value={salary}
                                   name='salary'
                                   type='text'
                                   placeholder='Salary'
                               />
                           </div>
                           <div className='field'>
                               <button
                                   type='submit'
                                   className='is-block is-rounded is-padding-small button is-info is-fullwidth'>
                                   Submit
                               </button>
                           </div>
                           <div className='field'>
                               <Link
                                   to='/engineers'
                                   className='is-block is-center is-rounded is-padding-small button is-danger is-fullwidth'>
                                   Back
                               </Link>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
        </Fragment> */}
    )
}

export default EditComponent
