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
  const myCartRef = useRef("")

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
          setMyCart(pets)
        })
    }
    catch (e) {
    }
  }
  
  useEffect(() => {
    getCartData()
  }, [])

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
        props.history.push('/myCart')
      }
      else {
        alert("Kindly Login to place your order")
        props.history.push('/')
      }
    } catch (e) { }
  }

  //handles add button click
  const handleAdd = async(e, pet) => {
    e.preventDefault();
    try {
      if (Email) {
        var obj = {
          name: pet.name,
          price: pet.price,
          src: pet.src
        };
        addItemToCart(obj)
        await getCartData()
      }
      else {
        alert("Kindly Login to place your order")
        props.history.push('/')
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

  return (
    <div>
      <Header 
      disabled={false}
        email={Email}
        handleSearch={e => handleSearch(e)}
        myCart={myCart}
      />
        <Layout
          email={Email}
          ref={myCartRef}
          data={petData}
          searchData={searchData}
          searched={searched}
          handleBuy={(e, pet) => handleBuy(e, pet)}
          handleAdd={(e, pet) => handleAdd(e, pet)}
        /> 
    </div>
  )
}

Dashboard = withRouter(Dashboard);
