import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Popup from 'reactjs-popup'

import '../css/aboutus.css'
import '../css/Signup_Login.css'
import '../css/style.css'
import '../css/viewprod.css'

export default function Cart() {
    const navigate = useNavigate();
    const [Products, SetProduct] = useState({});
    const [user, setUser] = useState({});
    const [Address, setAddress] = useState("");
    const [Mobile, setMobile] = useState("");
    const [BillAmount, seBill] = useState(0);
    const [CartNumber, setCartNumber] = useState(0);

    useEffect(() => {
        console.log(Products)
    }, [Products, user])

    const cartProd = async () => {
        try {
            const res = await fetch(`http://localhost:5000/CartProd`, {
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
            // if (data.message) {
            //     alert("Empty cart")
            //     navigate('/list')
            // }
            SetProduct(data.products)
            setUser(data.User_data);
            setCartNumber(data.CartLength)
            if (!res.status === 200 || res.status === 401) {
                window.alert("Please login to access this page")
                navigate('/login')
            }
        } catch (error) {
            console.log(`Catch error :${error}`)
            navigate('/login')
        }
    }

    useEffect(() => {
        cartProd();
    }, [])


    const cart = () => {
        window.location.reload();

    }

    const conf = async (_id) => {
        alert("order successful")

        console.log(Mobile)
        const currentDate = new Date();
        const DeliveryDate = new Date(currentDate.setDate(currentDate.getDate() + 20));


        const q = await Products.find((item) => item._id == _id);

        const res = await fetch("http://localhost:5000/CartOrder", {
            method: "POST",
            crossDomain: true,
            headers: {
                "content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                user_id: user._id,
                _id,
                Address,
                Mobile,
                BillAmount,
                DeliveryDate,
                Quantity: q.Quantity

            }),


        })

        const data = await res.json();
        console.log(data.message)
        if (res.status === 200) {
            window.alert("Product added to Order")
            navigate('/Order')
        }
    }
    ///Handle change///
    const handleQuantityChange = (itemId, increment) => {
        SetProduct(prevProducts => {
            return prevProducts.map(item => {
                if (item._id === itemId) {
                    const newQuantity = item.Quantity + (increment ? 1 : -1);
                    if (newQuantity < 1) {
                        window.alert("Can't order less than one");
                        return item;
                    }
                    return { ...item, Quantity: newQuantity };
                }
                return item;
            });
        });
    };

    /////Remove function///
    const remove = async (id) => {

        try {
            const response = await fetch(`/items/${id}`, {
                method: 'DELETE',
            });
            const data = response.json();
            console.log(data);
            if (response.status == 200) {
                console.log(`Item with ID ${id} has been removed.`);
                window.location.reload();

            } else {
                throw new Error('Failed to remove item.');
            }


        } catch (error) {
            console.log(`Error_line139- ${error}`);
        }
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
                    }}>Order</button></li>
                    <li><button onClick={() => {
                        navigate('/aboutus')
                    }}>About us</button></li>
                </ul>
            </nav>

            {CartNumber>0 ? (
                <ListGroup >
                    {Products.length > 0 && Products.map((item, index) => {
                        return (
                            <ListGroup.Item><div style={{
                                backgroundColor: "#003ea5",
                                height: "125pxpx", boxShadow: "2px 2px 2px 1px white", margin: "10px", padding: "25px 10px 10px 25px", borderRadius: "25px"
                            }}>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div> <img src={item.image} style={{ height: "100px", width: "100px" }} /></div>
                                    <div style={{ color: "whitesmoke" }}><h3>Price:${item.Price}</h3></div>
                                    <div className="quantity">
                                        <button
                                            id="decrement"
                                            type="button"
                                            class="btn btn-outline-primary"
                                            onClick={() => handleQuantityChange(item._id, false)}
                                        >
                                            -
                                        </button>
                                        <div>
                                            {item.Quantity}
                                        </div>
                                        <button
                                            id="increment"
                                            type="button"
                                            class="btn btn-outline-primary"
                                            onClick={() => handleQuantityChange(item._id, true)}
                                        >
                                            +
                                        </button>
                                    </div>

                                </div >


                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                    <div><Button onClick={() => {
                                        remove(item._id)
                                    }}>Remove</Button></div>
                                    <div>
                                        <Popup trigger=
                                            {<button> OrderNow </button>}
                                            position="left center">
                                            <div style={{ backgroundColor: "rgb(140, 50, 142)", padding: "10px", boxShadow: "5px 10px 10px 5px grey" }}>
                                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <div >
                                                        <img src={item.image}
                                                            style={{ height: "50px", width: "50px" }} />
                                                    </div>
                                                    <div style={{ color: "whitesmoke", paddingTop: "20px" }}>
                                                        Price: ${item.Price}
                                                    </div>
                                                </div>

                                                <div style={{ color: "whitesmoke", backgroundColor: "rgb(140, 50, 142)", paddingTop: "5px" }}>
                                                    <table>
                                                        <tr>
                                                            <th>Price : </th>
                                                            <td>${item.Price}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Number of items : </th>
                                                            <td>{item.Quantity}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Discount : </th>
                                                            <td>${item.Price * 25 / 100}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Delivery charge : </th>
                                                            <td>${item.Price * 0.1}</td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <th>Total : </th>
                                                            <td>${(item.Price * item.Quantity) - (item.Price * 25 / 100) + item.Price * 0.1}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Address</th>
                                                            <input type='text' placeholder='Address' onChange={(e) => {
                                                                setAddress(e.target.value)
                                                                seBill(`${(item.Price * item.Quantity) - (item.Price * 25 / 100) + item.Price * 0.1}`)
                                                            }}></input>
                                                        </tr>
                                                        <tr>
                                                            <th>Alternate Contact</th>
                                                            <input type='text' placeholder='Mobile number' onChange={(e) => {
                                                                setMobile(e.target.value)
                                                            }}></input>
                                                        </tr>
                                                    </table>
                                                    <button style={{ marginLeft: "35px" }} onClick={() => conf(item._id)}>Click here</button>
                                                </div>

                                            </div>


                                        </Popup>
                                    </div>
                                </div>
                            </div>
                            </ListGroup.Item>
                        )


                    })}

                </ListGroup >
            ) : (<div style={{
                color: "white", backgroundColor: "#003ea5",
                border: "solid black"
                , margin: "100px", paddingLeft: "300px"
            }}>
                <p><h4>Please add product to Cart</h4></p>
            </div>)}


            <footer>
                <p>&copy; 2023 Sports Store. All rights reserved.</p>
                <p>Verse Sports Store 582 Melbourne Street Florida FL32801</p>
                <p>Contact: info@sportsstore.com | Phone: +1 123-456-7890</p>
            </footer>

        </>
    )
}




