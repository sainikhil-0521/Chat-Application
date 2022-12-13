import React,{useState} from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";
import signinImage from "../assets/signup.jpg";

const cookies=new Cookies();

const intialState={
    fullName:'',
    userName:'',
    password:'',
    confirmPassword:'',
    phoneNumber:'',
    avatarURL:''
}

const Auth = () => {


    

    const [isSignup,setIsSignup]=useState(true);
    const [form,setForm]=useState(intialState);

    const handleChange = (event) =>{
        setForm({...form,[event.target.name]:event.target.value });

    };
    
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {userName,password,phoneNumber,avatarURL}=form;
        const URL='https://interact-app.onrender.com/auth';

        const {data:{token,userId,hashedPassword,fullName}}=await axios.post(`${URL}/${isSignup?'signup':'login'}`,{
            userName,password,fullName:form.fullName,phoneNumber,avatarURL,

        });
        cookies.set('token',token);
        cookies.set('userName',userName);
        cookies.set('fullName',fullName);
        cookies.set('userId',userId);

        if(isSignup){
            cookies.set('phoneNumber',phoneNumber);
            cookies.set('avatarURL',avatarURL);
            cookies.set('hashedPassword',hashedPassword);
            
        }
        window.location.reload();
    };
    



  return (
    <div className='auth__form-container'>
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <p>{isSignup?'Sign Up':'Sign In'}</p>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="fullName">Full Name</label>
                            <input 
                                type="text"
                                name='fullName'
                                placeholder='Full Name'
                                onChange={handleChange} 
                                required

                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="userName">UserName</label>
                            <input 
                                type="text"
                                name='userName'
                                placeholder='User Name'
                                onChange={handleChange} 
                                required

                            />
                    </div>
                    
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input 
                                type="text"
                                name='phoneNumber'
                                placeholder='Phone Number'
                                onChange={handleChange} 
                                required

                            />
                        </div>
                    )}

                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="avatarURL">Avatar URL</label>
                            <input 
                                type="text"
                                name='avatarURL'
                                placeholder='Avatar URL'
                                onChange={handleChange} 
                                required

                            />
                        </div>
                    )}

                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                name='password'
                                placeholder='Password'
                                onChange={handleChange} 
                                required

                            />
                    </div>

                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                type="password"
                                name='confirmPassword'
                                placeholder='Confirm Password'
                                onChange={handleChange} 
                                required

                            />
                        </div>
                    )}

                    <div className="auth__form-container_fields-content_button">
                        <button>{isSignup?'Sign Up':'Sign In'}</button>
                    </div>

                </form>
                <div className="auth__form-container_fields-account">
                    <p>
                        {isSignup?'Already have an account? ':"Don't have an account? "}
                        <span onClick={()=>{setIsSignup((preval)=>(!preval))}}>
                        {isSignup?'Sign In':"Sign Up"}
                        </span>
                    </p>
                </div>

            </div>
        </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="Sign in" />
      </div>
    </div>
  )
}

export default Auth;
