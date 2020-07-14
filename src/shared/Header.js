import React, { useState } from "react";
import { Grid, Button, TextField, Badge } from "@material-ui/core";
import CartIcon from '../assets/cart.png'
import { withRouter } from 'react-router'

export default function Header(props) {
//handles logout button click
  const handleLogout = () => {
    props.history.push("/")
  }

  const handleMyOrders=()=>{
    props.getMyOrders()
    props.handleCartClick()
  }
  
  return (
    <Grid container xs={12}>
      <nav>
        <header
          style={{
            width: "1345px",
            height: "70px",
            backgroundColor: "blue",
            color: "white",
            boxShadow: "0px 1px 6px #2C2C2C1C",
            opacity: 1
          }}
        >
          <Grid xs={12} container direction="row" style={{ marginLeft: 10 }}>
            <Grid item xs={4} align="left">
              <TextField
                style={{ width: 320, margin: 7, backgroundColor: 'white' }}
                variant="outlined"
                color="white"
                onChange={e => props.handleSearch(e)}
                placeholder="Search your favorite pet here..."
              />

              <Badge color="secondary" badgeContent={props.email ? props.myCart.length : null} style={{
                cursor: 'pointer',
                textDecoration: "none", textTransform: 'none', marginTop: 30,
                fontSize: 14, fontWeight: 'bold'
              }}>
                <img src={CartIcon} width="30px" height="30px"
                  onClick={e => props.handleCartClick(e)}
                />
              </Badge>
            </Grid>
            <Grid item xs={4} align="center" style={{ color: 'white', fontWeight: 'bold', fontSize: 24, marginBottom: 10 }}>
              PET WORLD
            </Grid>
            <Grid item xs={4} align="right">
              <Grid item>{props.email ? `Logged in as: ${props.email}` : ''} &nbsp;&nbsp;&nbsp;</Grid>
              <Grid item>
               {props.orders ? <span style={{cursor:'pointer'}} onClick={()=>handleMyOrders()}>My Orders</span>:null}
                <Button
                onClick={handleLogout}
                style={{
                  width: "90px",
                  height: "30px", textTransform: 'none', color: 'white', fontSize: '16px', fontWeight: 'bold'
                }}
              >{props.email ? 'Logout' : 'Login'}
              </Button></Grid></Grid>
          </Grid>
        </header>
      </nav>
    </Grid>
  );
}
Header = withRouter(Header);