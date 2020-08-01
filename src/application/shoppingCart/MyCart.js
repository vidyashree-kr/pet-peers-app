import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartTable from "./CartTable";
import Header from "../../shared/Header"
import { Grid, Button } from "@material-ui/core";
import { withRouter } from 'react-router'
import ConfirmDialog from './ConfirmDialog'
import axios from 'axios'

export default class MyCart extends Component {
  constructor() {
    super();
    this.state = {
      totalAmount: 0,
      open: false,
      cartItems:[]
    };
  }
//getting cart items from the server
 getCartData = () => {
  try {
    axios.get(`http://localhost:3002/myCart`)
      .then(res => {
        const pets = res.data;
        this.setState({cartItems:pets})
        if (pets.length !== 0) {
          const total = pets.reduce((a, b) => ({ price: a.price + b.price }));
          const totalPrice=total.price
           this.setState({totalAmount:totalPrice});
        }
      })
  }
  catch (e) {
  }
}

async componentDidMount(){
await this.getCartData()
}

  //deletes selected item from the shopping cart
  deleteItem=(id)=>{
    try {
      axios.delete(`http://localhost:3002/myCart/${id}`).then(res => {
          console.log('delete',res)
        })
    }
    catch (e) {
    }
  }
  handleItemDelete = (id) => {
    const { cartItems } = this.state;
    try {
      if (id > -1) {
        // cartItems.splice(index, 1);
        this.deleteItem(id)
        this.getCartData()
        if (cartItems.length !== 0) {
          const total = cartItems.reduce((a, b) => ({ price: a.price + b.price }));
          this.setState({ totalAmount: total.price });
        }
        else {
          this.setState({ totalAmount: 0 })
        }
      }
    } catch (e) {
      console.log(e.message)
    }
  };

  //opens confirm dialog on checkout button click
  handleCheckout = () => {
    this.setState({ open: true });
  }

  //handle confirm dialog close
  handleClose = () => {
   this.setState({ open: false });
 };
 

  //handles cancel button click in the shopping cart
  handleCancel = () => {
    this.props.history.push('/dashboard')
  }
 
  render() {
    return (
      <div>
        <Header disabled={true}/>
        <div style={{ marginLeft: 10 }}>
        {this.state.cartItems.length===0 ?
            <div><h1>Your Cart is Empty</h1>
             <Link onClick={this.handleCancel} style={{ fontWeight: 'bold', fontSize: 20 }}>Shop Now</Link>
            </div> : <>
          <h2>YOUR SHOPPING CART</h2>
          <CartTable
            cartItems={this.state.cartItems}
            handleItemDelete={(id)=>this.handleItemDelete(id)}
          />
          <div style={{ borderBottom: "4px solid grey", marginBottom: 10 }}></div>
          <Grid container xs={12}>
            <Grid item xs={7}>
              <Grid container xs={12} style={{ marginTop: 10, marginLeft: 5, fontWeight: 'bold' }}>
                <Grid item xs={3}>
                  Total Amount:
              </Grid>
                <Grid item xs={9} align="left">
                    {Number(this.state.totalAmount).toFixed(2)}
                </Grid>
              </Grid>
              <Grid container xs={12}>
              </Grid>

              <Grid>
                <Button
                  variant="contained"
                  style={{
                    boxShadow: "none",
                    marginLeft: 5,
                    marginTop: 15,
                    color: "white",
                    borderRadius: "unset",
                    backgroundColor: "blue"
                  }}
                  onClick={this.handleCheckout}
                >
                  CHECKOUT
              </Button>
                <Button
                  variant="contained"
                  style={{
                    boxShadow: "none",
                    marginLeft: 20,
                    marginTop: 15,
                    color: "white",
                    borderRadius: "unset",
                    backgroundColor: "blue"
                  }}
                  onClick={this.handleCancel}
                >
                  Cancel
              </Button>
              </Grid>

            </Grid>
          </Grid>
          </>}
          <ConfirmDialog
        cartItems={this.state.cartItems}
          handleClose={this.handleClose}
          open={this.state.open}
          totalAmount={this.state.totalAmount}
        />
        </div>
        </div>
    );
  }
}
MyCart = withRouter(MyCart);
