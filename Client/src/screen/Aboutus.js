import React, { useState, useEffect } from 'react'
import '../css/style.css';
import '../css/Signup_Login.css'
import '../css/aboutus.css'
import sports from "../image/sports.jpg"
import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom'

export default function Aboutus() {
    const navigate = useNavigate();

    

    return (
        <>
            <header style={{ display: "flex", justifyContent: "space-between" }}>
                <div></div>
                <h1 style={{marginRight:"350px"}}>Verse Sports Store</h1>


                
            </header>
            <nav>
                <ul>
                    <li>
                        <button onClick={() => {
                            navigate('/');
                        }} >Home</button>
                    </li>
                    <li><button onClick={() => {
                        navigate('/List')
                    }}>Product List</button></li>
                    <li><button onClick={() => {
                        navigate('/order')
                    }}>Orders</button></li>
                    <li><button onClick={() => {
                        navigate('/aboutus')
                    }}>About us</button></li>
                </ul>
            </nav>
            <hea />
            <main>
                <h2 class="headingAboutus">About Us</h2>
                <div class="Aboutusbox">
                    <div class="aboutuscontent">
                        <div class="aboutusimg">
                            <img class="aboutusinsideimage" src={sports} alt="aboutus" />
                        </div>
                        <div class="Content">
                            <p><b>Welocme Verse Sports Store:</b></p>
                            <p></p>
                            <p>
                                We established verse in 2001 and it's rapidly growing with 1 lakh
                                plus customers in USA.And we got an award for best online sports
                                seller in USA fallowing are our cultures to drive in
                            </p>
                            <p>
                                Passionate about sports: At Verse, we are driven by our passion
                                for sports and athletic excellence
                            </p>
                            <p>
                                Extensive product selection: We offer a wide range of high-quality
                                sporting goods and equipment.
                            </p>
                            <p>
                                Leading brands: We curate products from top brands across various
                                sports disciplines.
                            </p>
                            <p>
                                Convenient shopping experience: Our user-friendly website allows
                                you to browse and purchase sports items easily.
                            </p>
                            <p>
                                Secure online ordering: Rest assured that your personal
                                information is protected when you shop with us.
                            </p>
                        </div>
                    </div>
                    <div class="Membersimg">
                        <div class="Member">
                            <img src="Siva.jpg" alt="Siva" width="200" height="210" />
                            <h3>Kongara Sivakumar</h3>
                            <p>Chief Memeber Of Sports Store</p>
                        </div>
                        <div class="Member">
                            <img src="Teja.jpg" alt="Teja" width="200" height="210" />
                            <h3>Sai Tejavardhan Reddy</h3>
                            <p>Chief Memeber Of Sports Store</p>
                        </div>
                        <div class="Member">
                            <img src="Prem.jpg" alt="Prem" width="250" height="210" />
                            <h3>Putha PremKumar</h3>
                            <p>Chief Memeber Of Sports Store</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <p>&copy; 2023 Sports Store. All rights reserved.</p>
                <p>Verse Sports Store 582 Melbourne Street Florida FL32801</p>
                <p>Contact: info@sportsstore.com | Phone: +1 123-456-7890</p>
            </footer>
        </>
    )
}
