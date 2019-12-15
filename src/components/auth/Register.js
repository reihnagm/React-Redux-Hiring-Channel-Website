import React from 'react'

function Register () {
  return (
    <div className='form-auth'>
      <h2>Register</h2>
      <form>
        <input type='email' name='' placeholder='Email' />
        <input type='password' name='' placeholder='Password' />
        <label>as</label>
        <select>
          <option value='1'>Engineer</option>
          <option value='2'>Company</option>
        </select>
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
