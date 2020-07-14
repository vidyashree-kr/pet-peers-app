import React, { useEffect, useState, useRef } from 'react'
import Layout from './Layout'
import Header from '../../shared/Header'
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo'
import axios from 'axios';
import MyCart from '../shoppingCart/MyCart'
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'
import OrdersTable from '../myOrders/OrdersTable'

//gql query to get login details
const GET_USER_Details = gql`
  {
    email @client
    password @client
  }
`;

export default function Dashboard(props) {
  const [petName, setPetName] = useState('')
  const [filterText, setFilterText] = useState(0)
  const [petData, setPetData] = useState([])
  const [searched, setSearched] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [myCart, setMyCart] = useState([])
  const [open, setOpen] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const myCartRef = useRef("")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [orders, setOrders] = useState(false)
  const [myOrder, setMyOrders] = useState([])

  //getting login details from the server
  const { loading, data, error, client } = useQuery(GET_USER_Details)
  const { email: Email } = { ...data }

  //getting pet details from the server
  useEffect(() => {
    try {
      axios.get(`http://localhost:3002/petDetails`)
        .then(res => {
          const pets = res.data;
          setPetData(pets)
        })
    }
    catch (e) {
    }
  }, [])

  //getting cart items from the server
  const getCartData = () => {
    try {
      axios.get(`http://localhost:3002/myCart`)
        .then(res => {
          const pets = res.data;
          console.log('refresh cart',pets)
          setMyCart(pets)
        })
    }
    catch (e) {
    }
  }
  
  useEffect(() => {
    getCartData()
    getMyOrders()
  }, [])

  //getting ordered items from the server
  const getMyOrders = () => {
    axios.get(`http://localhost:3002/myOrder`)
      .then(res => {
        const pets = res.data;
        setMyOrders(pets)
        if(pets.length>0){
          setOrders(true)
        }
      })
  }

  //refresh myorders list
  const handleOrder = (cartItem) => {
    getMyOrders()
  }

  //My cart navigation
  const handleCartClick =async (e) => {
    if (Email) {
       setIsCartOpen(true)
      if (myCart.length !== 0) {
        const total = myCart.reduce((a, b) => ({ price: a.price + b.price }));
        await setTotalPrice(total.price);
      }
      else {
        setTotalPrice(0);
      }
    }
  };

  //add selected item to the cart
  const addItemToCart = (obj) => {
    axios.post(`http://localhost:3002/myCart`, obj).then(res => { })
  }

  //handles buy button click
  const handleBuy = async(e, pet) => {
    e.preventDefault();
    try {
      if (Email) {
        const { name, price, src } = pet;
        let obj = { name, price, src }
        await addItemToCart(obj)
        getCartData()
        handleCartClick()
      }
      else {
        alert("Kindly Login to place your order")
        props.history.push('/login')
      }
    } catch (e) { }
  }

  //handles add button click
  const handleAdd = (e, pet) => {
    e.preventDefault();
    try {
      if (Email) {
        var obj = {
          name: pet.name,
          price: pet.price,
          src: pet.src
        };
        addItemToCart(obj)
        getCartData()
      }
      else {
        alert("Kindly Login to place your order")
        props.history.push('/login')
      }
    } catch (e) { }
  };

  //handling search item functionality
  const handleSearch = e => {
    e.preventDefault();
    const filterText = e.target.value;
    if (petName) {
      setPetName(null);
      petSearch(filterText);
    }
    else {
      setFilterText()
      petSearch(filterText);
    }
  };
  const petSearch = filterText => {
    try {
      if (filterText.length >= 1) {
        const filterData = petData.filter(pet => {
          const name = pet.name.toLowerCase();
          const filterValue = filterText.toLowerCase();
          return (
            name.startsWith(filterValue)
          );
        });
        setSearchData(filterData);
        setSearched(true)
      } else if (filterText.length === 0) {
        setSearchData(petData);
      }
    } catch (e) { }
  };

  //handling back button click
  const handleBackLink = () => {
    setIsCartOpen(false)
  }

  //clearing cart items
  const handleClear = () => {
    setMyCart([])
  }

  return (
    console.log('oreder',orders),
    <div>
      <Header 
        orders={orders}
        email={Email}
        handleSearch={e => handleSearch(e)}
        myCart={myCart}
        totalPrice={totalPrice}
        open={open}
        getMyOrders={getMyOrders}
        handleCartClick={() => handleCartClick()}
      />
      {!isCartOpen ?
        <Layout
          email={Email}
          ref={myCartRef}
          data={petData}
          searchData={searchData}
          searched={searched}
          handleBuy={(e, pet) => handleBuy(e, pet)}
          handleAdd={(e, pet) => handleAdd(e, pet)}
        /> :
        myCart.length === 0 || 
        orders  ?
          <div style={{ marginLeft: 15 }}>
            <h1>{myCart.length===0 ?'Your Cart is Empty': orders ? 'My Orders':null}</h1>
              { orders ? 
              <OrdersTable
              myOrder={myOrder}
              />
              :null}
             <Link onClick={handleBackLink} style={{ fontWeight: 'bold', fontSize: 20 }}> 
             {myCart.length===0 ?'Shop Now': orders ? 'Continue Shopping':null}
             </Link>
          </div> 
          :
          <MyCart
            handleOrder={() => handleOrder()}
            handleClear={handleClear}
            handleBackLink={handleBackLink}
            cartItem={myCart}
            getCartData={getCartData}
            totalPrice={totalPrice}
          />}
    </div>
  )
}

Dashboard = withRouter(Dashboard);