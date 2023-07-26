import React, { useState } from 'react'
import {auth} from "../firebase"
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useCookies } from 'react-cookie';

import '../css/Signup_Login.css'
import '../css/style.css'
export default function Login() {
  const navigate=useNavigate();
    const [Email,setEmail]=useState("");
    const [Password,setpass]=useState("");
    const [cookies, setCookie] = useCookies(['user']);
    
     const submission=async(e)=>{
        e.preventDefault();
        

      const res= await fetch("https://github.com/shan-zeeshan786/Sports_Store/signin",{
            method:"POST",
            crossDomain:true,
            headers:{
                "content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                Email,
                Password,
                
            }),

        })
        const data=await res.json();
        const Token=data.Token;
        console.log(data.Token)
        localStorage.setItem('Token',Token);
        setCookie("jwtoken",Token,{ path: '/' });
        console.log(cookies.jwtoken)
        if(res.status===400 || !data){
            window.alert("Wrong credentials");

        }else{
            window.alert("Login successfull");
            navigate('/list')
        }
        // e.preventDefault();
        // console.log(Email);
        // console.log(Password);

        // signInWithEmailAndPassword(auth,Email,Password).then((userCredenial)=>{
        //     console.log(userCredenial);
        //     alert("Login sucessful")
        //     navigate('/list')
        // }).catch((error)=>{
        //     alert('Wrong credentials')
        //     console.log(error);
        // })
     }
    return (
        <>
            <header>
                <h1 class="titleh1">Verse Sports Store</h1>
            </header>
            
            <main>
                <h2>Welcome to Sports Store</h2>
                <div class="Loginbox">
                    <div class="Loginpage">
                        <h2 class="Loginheading">Verse Sports Store Login Page</h2>
                    </div>
                    <div>
                        <form onSubmit={submission} >
                               <div class="Names">
                                <label for="Email">Email:</label>
                                   <div>
                                    <input type="email" class="usertextboxsize" value={Email} id="Email" name="Email" placeholder="Enter your Email" 
                                    onChange={ (e)=>{
                                        setEmail(e.target.value)
                                    }}required /><br/>
                                    </div>
                                </div>
                                <div class="Names">
                                    <label for="password">Password:</label>
                                    <div>
                                        <input type="password" class="pwdtextboxsize" value={Password} id="password" name="pwd"
                                            placeholder="Enter your password" onChange={(e)=>{
                                                setpass(e.target.value);
                                            }} required/><br/><br/>
                                            </div>
                                </div>
                                            <div class="Submitbtn">
                                                <Button type='submit' style={{marginRight:"10%"}}>Login</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </main>
                            <footer>
                                <p>&copy; 2023 Sports Store. All rights reserved.</p>
                                <p>Verse Sports Store
                                    582 Melbourne Street
                                    Florida FL32801
                                </p>
                                <p>Contact: info@sportsstore.com | Phone: +1 123-456-7890</p>
                            </footer>
                        </>

                        )
}
