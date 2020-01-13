import React, { Fragment, useState, useEffect } from 'react'
import InputMask from 'react-input-mask'
import DatePicker from 'react-datepicker'
import Moment from 'react-moment'
import Spinner from './Spinner'
import EditComponent from './EditComponent'
import 'react-datepicker/dist/react-datepicker.css'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateProfileEngineer, getCurrentProfileEngineer } from '../../actions/engineer'

const UpdateProfileEngineer = ({
    updateProfileEngineer,
    getCurrentProfileEngineer,
    engineer: { engineer, loading },
    auth: { user },
    history, match }) => {

    const user_id = match.params.id

    const onChangeAvatar = (event) => {
        const files = event.target.files
        const extension = files[0].name.split('.')
        const filename = extension[extension.length - 1]
        const size = files[0].size
        if(size >= 5242880 ) {
            alert('Oops!, Size cannot more than 5MB')
            document.getElementById('avatar').value = ''
            return false
        } else if(!isImage(filename.toLowerCase())) {
            alert('Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG')
            document.getElementById('avatar').value = ''
            return false
        } else {
            setAvatar(files[0])
        }
    }
    function isImage(filename) {
        switch (filename) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                  return true
            }
            return false
    }

    const [id, setId] = useState(128)
    const [name, setName] = useState()
    const [avatar, setAvatar] = useState()
    const [email, setEmail] = useState('reihanagam7@gmail.com')
    const [description, setDescription] = useState('hello hello world')
    const [showcase, setShowcase] = useState('http://reihanagam.id/showcase')
    const [telephone, setTelephone] = useState('089670558381')
    const [skill, setSkill] = useState('Laravel, CSS, Javascript')
    const [salary, setSalary] = useState('1.000.000')
    const [location, setLocation] = useState('Jakarta')
    const [birthdate, setBirthdate] = useState(new Date())

    const onChangeName = (event) => {

    }

    const onChangeEmail = (event) => {

    }

    const onChangeSalary = (event) => {

    }

    const onChangeSkill = (event) => {

    }

    const onChangeDescription = (event) => {

    }

    const onChangeLocation = (event) => {

    }

    const onChangeShowcase = (event) => {

    }

    const onChangeTelephone = (event) => {

    }

    const onChangeBirthdate = (value) => {
        setBirthdate(value)
    }

    useEffect(() => {
        getCurrentProfileEngineer(user_id)
    },[getCurrentProfileEngineer, user_id])

    const updateEngineer = (event) => {
        event.preventDefault()

        let formData = new FormData()
        formData.set('name', name)
        formData.set('description', description)
        formData.set('skill', skill)
        formData.set('telephone', telephone)
        formData.set('salary', salary)
        formData.set('showcase', showcase)
        formData.set('location', location)
        formData.append('avatar', avatar)
        formData.set('user_id', user_id)

        updateProfileEngineer(id, formData, history)
    }

        return loading ? ( <Spinner/> ) : (
            <EditComponent data={engineer[0]} />
        )

}
const mapStateToProps = state => ({
    engineer: state.engineer,
    auth: state.auth
})

export default connect(mapStateToProps, { updateProfileEngineer, getCurrentProfileEngineer })(withRouter(UpdateProfileEngineer))
