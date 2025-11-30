// this is dummy page
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './DataProvider'
import { validationRegx } from './ValidationRegx'

function Signup() {
    const [temp,setTemp] = useState({
        tName:"",
        tErrorMessage:true
    })
    const { setShow, setLogIn, setShowSignUp, userName, setUserName, email, setEmail, phoneNumber, setPhoneNumber, dob, setDob, password, setPassword, confirmPassword, setConfirmPassword } = useContext(DataContext)

    const handleSubmit = (e) => {
        e.preventDefault();

        const signUpData = {
            userName,
            email,
            phoneNumber,
            dob,
            password
        }
        console.log('signUp data', signUpData)

        setLogIn(true)
        setShowSignUp(false)
        alert('sign up successfully')
    }
    const validate = (value) => {
        console.log(value,"validation regex for name ")

        console.log(validationRegx.username.test(value),"validation regex")
        if(validationRegx.username.test(value)){
           return true
        }
        return false
    }
    const onsubmit = (e) => {
        if(e.name=="name")
        {
            if(validate(e.value))
            {
                setTemp({...temp,tName:e.value})
                setTemp({...temp,tErrorMessage:false})
            }
            else{
                setTemp({...temp,tErrorMessage:true})
            }
        }
        console.log(e.value,"value")
        console.log(e.name,"name")


    }

    const handleLogin = () => {
        setLogIn(true)
        setShowSignUp(false)
    }
    return (
        <div className='d-flex w-100 ' style={{ color: '#111' }} >
            <div className='d-flex w-100 justify-content-center' style={{padding: '1rem 6rem'}}>
                <form className='' action="">
                    <div className='d-flex flex-column align-items-center w-100'>
                        <div>
                            <h2>Sign-Up</h2>
                        </div>
                        <div className='d-flex w-100 flex-column' style={{gap: '.5rem'}}>
                            <div className='d-flex flex-column'>
                                <p className='mb-1 font-weight-bold' >Name</p>
                                <div className='d-flex'>
                                    <input name ="name"className='input form-control' placeholder='Name' type="text"  onChange={(e) => onsubmit(e.target)} required />
                                </div>
                                <p style={{color:"red"}}>{temp?.tErrorMessage && please enter the correct user name}</p>
                            </div>
                            <div>
                                <p className='mb-1 font-weight-bold' >Email</p>
                                <div className='d-flex'>
                                    <input className='input form-control' placeholder='Email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <p className='mb-1 font-weight-bold' >Phone Number</p>
                                <div className='d-flex'>
                                    <input className='input form-control' placeholder='Phone number' type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                </div>
                            </div>
                            <div className='d-flex align-items-center' style={{gap: '1rem'}}>
                                <p className='mb-1 font-weight-bold' >DOB: </p>
                                <div>
                                    <input className='input form-control' type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <p className='mb-1 font-weight-bold' >Password</p>
                                <div className='d-flex'>
                                    <input className='input form-control' placeholder='' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <p className='mb-1 font-weight-bold' >Confirm Password</p>
                                <div className='d-flex'>
                                    <input className='input form-control' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <div className='d-flex justify-content-around'>
                                    <button className='btn btn-danger' type='button' onClick={() => setShow(false)} >Cancle</button>
                                    <button className='btn btn-success' type='submit' onClick={handleSubmit} >Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <p>Alrady have account?</p>
                        <Link onClick={handleLogin} ><span>Login</span></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup