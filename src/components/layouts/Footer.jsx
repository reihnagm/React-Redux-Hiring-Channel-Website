import React, { Fragment } from 'react';
const Footer = () => {
    let Currentyear =  new Date().getFullYear()
    return (
        <div style={{ height: '80%' }}>
            <div style={{ minHeight: '100%' }}>
                <div id="cover-landing">
                    <h1 style={{
                        color: '#000000',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        position: 'absolute',
                        top: '40%',
                        left: '50%'
                    }}>
                        Welcome to Hiring Channel Website
                    </h1>
                </div>
            </div>
            <footer>
                <div style={{
                    boxShadow: '0px -4px 4px #eeeeee',
                    height: '53px',
                    lineHeight: '53px'
                }} >
                <p className='text-black is-center is-bold'> { Currentyear }  </p> </div>
            </footer>
        </div>
    )
}
export default Footer;
