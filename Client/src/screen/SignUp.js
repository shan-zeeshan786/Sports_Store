import React, { useState } from 'react'
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import '../css/Signup_Login.css'
import '../css/style.css'
export default function SignUp() {
    const navigate = useNavigate();
    
    const [Email, setEmail] = useState("");
    const [Password, setpass] = useState("");
    const [Firstname,setfirstname]=useState('');
    const [Secondname,setsecondname]=useState("");
    const [UserName,setUserName]=useState("");
    const [Mobile,setMobile]=useState(0);
    
    const newAccount = async (e) => {
        e.preventDefault();
        console.log(Email);
        console.log(Password);
        console.log(Secondname)

      const res= await fetch("/signup",{
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
                Firstname,
                Secondname,
                UserName,
                Mobile
            }),

        })
        const data=res.json();
        console.log(data.status)
        if(data.status===422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else{
            window.alert ("Registraion successful")

            navigate('/login')
        }
       
    }
    return (
        <>
            <header>
                <h1 class="titleh1">Verse Sports Store</h1>
            </header>
            
            <main>
                <div class="Signupbox">
                    <div class="Signuppage">
                        <h2 class="Loginheading">Verse Sports Store Signup Page</h2>
                    </div>
                    <div>
                        <form onSubmit={newAccount} method='Post'>
                            <div class="Names">
                                <label class="Sportsfirstname" for="firstname">First Name:</label>
                                <div>
                                    <input type="text" class="usertextboxsize" id="firstname" name="firstname" 
                                    onChange={(e) => {
                                        setfirstname(e.target.value);
                                    }} required /><br />
                                </div>
                            </div>
                            <div class="Names">
                                <label for="lastname">Last Name:</label>
                                <div>
                                    <input type="text" class="usertextboxsize" id="lastname" name="lastname"
                                    onChange={(e) => {
                                        setsecondname(e.target.value);
                                    }} required /><br />
                                </div>
                            </div>
                            <div class="Names">
                                <label for="username">Username:</label>
                                <div>
                                    <input type="text" class="usertextboxsize" id="username" name="username" 
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                    }}
                                     required /><br />
                                </div>
                            </div>
                            <div class="Names">
                                <label for="pass" >Password:</label>
                                <div>
                                    <input type="password" value={Password} class="pwdtextboxsize" id="pass" name="pwd"
                                        onChange={(e) => {
                                            setpass(e.target.value);
                                        }} required /><br />
                                </div>
                            </div>
                            <div class="Names">
                                <label for="email">Email:</label>
                                <div>
                                    <input type="email" value={Email} class="mailtextboxsize" id="email" name="email"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} required /><br /><br />
                                </div>
                            </div>
                            <div class="Names">
                                <label for="phone">Phone:</label>
                                <div>
                                    <input type="number" value={Mobile} class="mailtextboxsize" id="phone" name="email"
                                        onChange={(e) => {
                                            setMobile(e.target.value);
                                        }} required /><br /><br />
                                </div>
                            </div>
                            <div class="Submitbtn">
                                <button type="submit" >SignUp</button>
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
