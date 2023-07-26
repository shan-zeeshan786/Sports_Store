import React, { useState, useEffect } from 'react'

import '../css/viewprod.css'
import { useNavigate, useParams } from 'react-router-dom'
// import Products from "../Api/data.json"

export default function ViewProd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Quantity, SetQuan] = useState(1);
  const [Products, SetProduct] = useState({});
  const [User, setUser] = useState({})
  const [CartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    console.log(Products)
    console.log(User)
  }, [Products, User])
  const view = async () => {
    try {
      const res = await fetch(`http://localhost:5000/viewprod/${id}`, {
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

      SetProduct(data.find)
      setUser(data.User_data);
      setCartNumber(data.CartLength)
      if (!res.status === 200 || res.status === 401) {
        window.alert("Please login to access this page")
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
      navigate('/login')
    }
  }

  useEffect(() => {
    view();
  }, [])

  const cart = () => {
    navigate("/cart");
  }

  const AddToCart = async (e) => {
    e.preventDefault();


    const res = await fetch("http://localhost:5000/cart", {
      method: "POST",
      crossDomain: true,
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        _id: User._id,
        prod_id: Products._id,
        Quantity

      }),

    })
    const data = await res.json();
    console.log(data);
    if (res.status != 200) {
      alert("Please try again")
    } else {
      alert("Added successfully")
      navigate('/Cart')
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
            navigate('/order')
          }}>Order</button></li>
          <li><button onClick={() => {
            navigate('/aboutus')
          }}>About us</button></li>
        </ul>
      </nav>
      <main>
        <h2>Product Details</h2>
        <div class="prod-details">
          <div class="product-image">

            {Products._id && (
              <img
                src={Products.image}
                alt="Product Image"
              />

            )}
          </div>
          {Products._id && (<div class="product-info">
            <h3>{Products.title}</h3>
            <p class="viewpara">
              {Products.description}
            </p>
            <p>Price: ${Products.price}</p>

            <div className="quantity">
              <button
                id="decrement"
                type="button"
                class="btn btn-outline-primary"
                onClick={() => {
                  if (Quantity == 1) {
                    return window.alert("can't order less than one")
                  }
                  SetQuan(Quantity - 1);
                }}
              >
                -
              </button>
              <div>
                {Quantity}
              </div>
              <button
                id="increment"
                type="button"
                class="btn btn-outline-primary"
                onClick={() => {
                  SetQuan(Quantity + 1);
                }}
              >
                +
              </button>
            </div>
            <button id="submit" type="submit" class="btn btn-primary" onClick={AddToCart}>
              Add to cart
            </button>
          </div>)}

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
