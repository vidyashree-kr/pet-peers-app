import React, { Component } from "react";
import CartTable from "./CartTable";
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
      deleted: false
    };
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
    const { cartItem } = this.props;
    console.log('delete cartItem',cartItem,id)
    this.setState({ deleted: true })
    try {
      if (id > -1) {
        // cartItem.splice(index, 1);
        this.deleteItem(id)
        this.props.getCartData()
        if (cartItem.length !== 0) {
          const total = cartItem.reduce((a, b) => ({ price: a.price + b.price }));
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
    this.props.handleBackLink()
    this.props.history.push('/dashboard')
  }

 
  render() {
    const { totalAmount } = this.state;
    return (
      <>
        <div style={{ marginLeft: 10 }}>
          <h2>YOUR SHOPPING CART</h2>
          <CartTable
            cartItem={this.props.cartItem}
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
                  {this.state.deleted ?
                    Number(totalAmount).toFixed(2) : Number(this.props.totalPrice).toFixed(2)}
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
        </div>
        <ConfirmDialog
        cartItem={this.props.cartItem}
          handleClose={this.handleClose}
          open={this.state.open}
          deleted={this.state.deleted}
          totalAmount={this.state.totalAmount}
          totalPrice={this.props.totalPrice}
          handleClear={this.props.handleClear}
          handleOrder={()=>this.props.handleOrder()}
        />
      </>
    );
  }
}
MyCart = withRouter(MyCart);