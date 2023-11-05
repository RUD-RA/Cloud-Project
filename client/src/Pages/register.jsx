import {useNavigate } from 'react-router-dom'
import { useState,useContext} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {UserContext} from '../context/userContext.jsx'
import './auth.css'
const Register = () => {  
    const {setUser,currentUser} = useContext(UserContext)
    const navigate = useNavigate()

    const [formData, setformData] = useState({
        email:"",
        password:""
    })

    const handleChangeEmail = (e)=>{
        setformData({...formData,email:e.target.value})
    }

    const handleChangePassword = (e)=>{
        setformData({...formData,password:e.target.value})
    }

    const handleClick = async(e)=>{
        e.preventDefault()

        try{
            const res = await axios.post("/api/register",{
                email:formData.email,
                password:formData.password
            })

            if(res.data.success){
                toast.success(res.data.message)
                setUser({...currentUser,user:res.data.currentUser})
                navigate("/")
            }
        }
        catch(error){
            // console.log(error)
            toast.error(error.response.data.message)
        }

        setformData({email:"",password:""})
    }

    return (
        <div className="login-form">

            <div className="form-body">
                <div className="form-text">
                    <span>Register</span>
                </div>

                <div className="main-form">
                    <form>
                        <div className='form-group'>
                            <input type='email' placeholder='Email' className="email" value={formData.email} onChange={handleChangeEmail}/>
                        </div>
                        <div className='form-group'>
                            <input type='password' placeholder='Password' className="pass" value={formData.password} onChange={handleChangePassword}/>
                        </div>
                    </form>
                    <div className="form-info">
                        <button type='submit' onClick={handleClick}>Register</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Register