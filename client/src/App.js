import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react"
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import PayPalApis from "./PaypalApis";

function App() {
  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [image, setImage] = useState("")

  function uploadImage() {

    const formData = new FormData();
    formData.append("photo", image);

    console.log(image)
    axios.post('http://localhost:5000/api/uploadimage', formData)
  }

  function addtocart(item) {

    const updatedCart = [...cartItems]
    const existingItem = updatedCart.find((cartItem) => cartItem._id === item._id)
    if (existingItem) {
      existingItem.quantity += 1

    }
    else {
      updatedCart.push({ ...item, quantity: 1 })
    }
    console.log(updatedCart)
    setCartItems(updatedCart)
    //call the backend route
    localStorage.setItem('cart', JSON.stringify(updatedCart))

  }

  function removefromcart(itemId) {
    const updatedCart = cartItems.filter((item) => item._id !== itemId)
    setCartItems(updatedCart)
    //call the backend route
    localStorage.setItem('cart', JSON.stringify(updatedCart))

  }


  useEffect(() => {
    // products
    axios.get('http://localhost:5000/api/getproducts')
      .then(res => {
        console.log(res.data)
        setProducts(res.data.products)
      })

    // user data
    axios.post('http://localhost:5000/api/getuser', { id: "6528072d70d54f147a7f784e" })
      .then(res => {
        console.log(res.data)
        setUser(res.data, user)
      })

    //cart data
    const storedCart = JSON.parse(localStorage.getItem('cart'))
    if (storedCart)
      setCartItems(storedCart)
  }, [])

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };


  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="App">
        <h1>Ecommerce App</h1>

        <h1>Products</h1>
        {products?.map(product => (
          <>
            <h3>{product.name}</h3>
            <button onClick={() => addtocart(product)}>Add to cart</button>
          </>
        ))
        }

        <h1>Cart</h1>
        {
          console.log(cartItems)}
        {cartItems?.map(cartItem => (
          <>
            <h3>{cartItem.name}</h3>
            <h3>{cartItem.quantity}</h3>
            <button>+</button>
            <button>-</button>
            <button onClick={() => removefromcart(cartItem._id)}>Remove</button>
          </>
        ))
        }

        <h1>Image Upload</h1>
        <input type="file" name="photo" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={uploadImage}>Upload</button>
        <PayPalApis />

      </div >
    </PayPalScriptProvider>
  );
}

export default App;
