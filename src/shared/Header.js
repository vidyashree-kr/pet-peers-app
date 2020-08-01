uimport React from "react";
import { Grid, Button, TextField, Badge } from "@material-ui/core";
import CartIcon from '../assets/cart.png'
import { withRouter } from 'react-router'

export default function Header(props) {
//handles logout button click
  const handleLogout = () => {
    props.history.push("/")
  }

  const handleMyOrders=(e)=>{
    e.preventDefault()
    // if(props.email){
    props.history.push('/myOrders')
    // }
  }
  
  const handleMyCart=(e)=>{
    e.preventDefault()
    // if(props.email){
    props.history.push('/myCart')
    // }
  }
  return (
    <Grid container xs={12}>
      <nav>
        <header
          style={{
            width: "1260px",
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
              disabled={props.disabled}
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
                  onClick={(e) => handleMyCart(e)}
                />
              </Badge>
            </Grid>
            <Grid item xs={4} align="center" style={{ color: 'white', fontWeight: 'bold', fontSize: 24, marginBottom: 10 }}>
              PET WORLD
            </Grid>
            <Grid item xs={4} align="right">
              <Grid item>{props.email ? `Logged in as: ${props.email}` : ''} &nbsp;&nbsp;&nbsp;</Grid>
              <Grid item>
               <span style={{cursor:'pointer'}} onClick={(e)=>handleMyOrders(e)}>My Orders</span>
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
