import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button } from 'react-bootstrap';

import '../css/aboutus.css'
import '../css/Signup_Login.css'
import '../css/style.css'
import '../css/viewprod.css'

export default function Order() {

    const navigate = useNavigate();

    const [Orders, setOrder] = useState([]);
    const [Products, setpro] = useState({});
    const [CartNumber,setCartNumber] = useState(0);


    const OrderFunction = async () => {
        try {
            const res = await fetch(`http://localhost:5000/Order`, {
                method: "GET",
                crossDomain: true,
                headers: {
                    Accept: "application/json",
                    "content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },

                credentials: "include"
            });
            const data = await res.json();
            console.log(res.status)
            
                setOrder(data.Products);
                setpro(data.AllProductData)
            
            
            setCartNumber(data.CartLength)
            console.log(data);
        } catch (error) {
            console.log(`Catch error-${error}`)
        }
    }

    const imageFunction = (prod_id) => {

        const product = Products.find((item) => item._id == prod_id);

        if (product) {
            return product.image;
        } else {
            return "";
        }
    };


    useEffect(() => {
        OrderFunction();
    }, [])

    const cart = () => {
        navigate("/cart");
    }
    return (
        <>
            <header style={{ display: "flex", justifyContent: "space-between" }}>

                <div></div>
                <h1 class="titleh1">Verse Sports Store</h1>

                <div
                    onClick={cart}
                    style={{
                        position: "relative",
                        display: "inline-block",
                        cursor: "pointer",
                        marginTop: "18px",
                        marginRight: "20px",
                        transition: "transform 0.3s ease-in-out",
                    }}
                >
                    <img
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAB7CAMAAABOx+KyAAAAclBMVEX///8sNDYlLjAUHiNNU1MUIyMAAAClqKf6+vpzeHpVWlsdJylkZ2hQVlcjLC+BhYeOkJHv7/Do6utESkyWmpwACAzi4+QUICLW2NgAFBdHT1AyODo8Q0QPHB+eoKEZIybHysq5vLxscXGusrMAGhoNFxzQNZhTAAAD3klEQVR4nO2a2ZaqMBBFQxw6zPMkIEG9//+LtyKOAbWT0OBD9lr90PDAoZKcGhAhjUaj0Wg0Go1Go9FoNBoOwrO0oJ4k7tndOHRLawL2KeaxV1a4tCzkeMaQ/LD4Yjr2iC4j/VlaF23zfJU/gkEXjhcPWJFwWJvKMLxiaV1DDrC09n5pFcMFKwxc4d0CUj5AYthiabS0jCF+Czu/dt21HG6Q/Y0u2rAjKU9e0T/RFdZ4zNR+D66ms5mHpE2CsSQgQjuVLxOzT9wx+MNxVyvKMmxzIl1dedkbaYZKxVUEPGuihaSnvLWBvApR3dg3JBfUmypeqPN7IP9kgX9jtNz4zFTp4qFI5RbAlxKWq6bXj9vg2MjoqlUkMVe4/L0klFrINpBWFR5cy3JYuBPrDcZo2fiJhkrrChowhXYNu3z7LqXIqDLwWr4/2KfgAo2DULS1XyHrY7YvLQuEgQsE7L06/xVrSfdKqYKuXxBachGbMGuPI2dekyXHV2Q7qXjZ6v165zIzMGGbRebQJCq5ZbSVu/UIe+caIoElKycyCagllMMFujwPe+VZl/cKQX3NUVkXopYD+HB+Qt95ieB6/lHXMaJeRJXnzDZBI66ArpNaaT94pzcvSSsBXfINMfFN2AKFycFqiz1/8YwhsL+wKysLBWVrIVLaz6fOrgk6jh9KgWgZG/kKOmhAV5jzumKCusbDKhbB4iVfQYcHVg92lvvI2ipYQ7t2n6+2orJUKmgBqGDENvIVtBChYOrO6Ty6CrFw4XiqCTv1z1bAKldyVLMI4N9U48+o7vv/FEpymg5LfLFwtZONsbO+0sGrA7Swo50RW530yvYtJ3O67yTHvgR0MuYSYx1khbHPN7tPRDcmzNfXbvvy3wgFVDlfOMxnX5Bwlfz8jhmH2CGbmrebX5EbyhusCJKQjbp42NXo8YJID1mVqjV01tpljCKj5Y2hdBCJHwaGYsOAVtW/ihwcAGVD2/TWKmPyrfI8LkkNaD9/0hUHpuAdG/4q0Ixc4+/Zi3+2/CLAQl/dIlG41HfUzI+r2hzdPiRxq9qhMwvqOZZwMLG9HTlvRcs+PePtEt/qi/Jy4P4NZjVR7PVtXKsyJZSD3KbSw8IvuA3St7MNAK4U9yF+yQWM3Es0e6ba/s6xvD085x5e3Dsm7My9w/b3ePG7iD7ocufW9RCvJnm+lS0ZryK/PfxEuXv3KcH8+4s410yOd990HlGRXoSVlL8Vri8ncjW/fyHUeWe/b0YKhqxqmd835iIpEvKjUfvF2PiO7F2jYvlxAWHk3Cy9vPstP0rUaDQajUaj0Wg0Go1G81X8B9W5U6zS/bnYAAAAAElFTkSuQmCC'
                        alt="Cart"
                        style={{
                            height: "50px",
                            width: "50px",
                            objectFit: "cover",
                        }}
                    />
                    {CartNumber > 0 && (
                        <div
                            style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                backgroundColor: "red",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                        >
                            {CartNumber}
                        </div>
                    )}
                </div>
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
                        navigate('/Order')
                    }}>Orders</button></li>
                    <li><button onClick={() => {
                        navigate('/aboutus')
                    }}>About us</button></li>
                </ul>
            </nav>
            {Orders ? (<>
                <ListGroup >
                    {Products.length > 0 && Orders.length > 0 && Orders.map((item, key) => {
                        const deliveryDate = new Date(item.DeliveryDate);

                        // Extract the date, month, and year components
                        const day = deliveryDate.getDate();
                        const month = deliveryDate.getMonth() + 1; // Months are zero-based, so add 1
                        const year = deliveryDate.getFullYear();
                        const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        const dayOfWeek = weekdayNames[deliveryDate.getDay()];

                        return (
                            <ListGroup.Item key={key}><div style={{
                                backgroundColor: "#003ea5", height: "125pxpx", boxShadow: "2px 2px 2px 1px white", margin: "10px", padding: "25px 10px 10px 25px", borderRadius: "25px"
                            }}>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div> <img src={imageFunction(item._id)} style={{ height: "100px", width: "100px" }} /></div>
                                    <div style={{ color: "whitesmoke" }}><h3>Bill :${item.BillAmount}</h3>
                                        <h3> Number of items: {item.Quantity}</h3>
                                    </div>

                                    <div style={{ color: "whitesmoke" }}>
                                        <h3>Expected Delivery Date:</h3>
                                        <h4>{`${day} / ${month} / ${year}`}</h4>
                                        <h4>{dayOfWeek}</h4>
                                    </div>

                                </div >
                            </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup >

            </>) : (
                <div style={{
                    color: "white", backgroundColor: "#003ea5",
                    border: "solid black"
                    , margin: "100px", paddingLeft: "300px"
                }}>
                    <p><h4>Not Ordered yet</h4></p>
                </div>

            )}

            <footer>
                <p>&copy; 2023 Sports Store. All rights reserved.</p>
                <p>Verse Sports Store 582 Melbourne Street Florida FL32801</p>
                <p>Contact: info@sportsstore.com | Phone: +1 123-456-7890</p>
            </footer>

        </>
    )
}
