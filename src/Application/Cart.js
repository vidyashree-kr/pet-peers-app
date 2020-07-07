import React, { Component } from "react";
import CartTable from "./CartTable";
import { Grid, Dialog, DialogContent, Typography, Button } from "@material-ui/core";
import closeicon from "../assets/close.png";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      totalAmount: 0,
      promotionCode: "AJ10",
      applyCode: "AJ10",
      promoteAmount: 5.9, deleted: false
    };
  }
  handleItemDelete = index => {
    const { cartItem } = this.props;
    this.setState({ deleted: true })
    try {
      if (index > -1) {
        cartItem.splice(index, 1);
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

  render() {
    const { totalAmount } = this.state;
    return (
      <>
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <div align="right" style={{ margin: 10 }}>
            <img
              onClick={this.props.handleClose}
              width="20px"
              height="20px"
              src={closeicon}
              style={{cursor:'pointer'}}
            ></img>
          </div>
          <DialogContent>
            <div style={{ marginLeft: 10 }}>
              <h3>YOUR SHOPPING CART</h3>
              <CartTable
                cartItem={this.props.cartItem}
                handleItemDelete={this.handleItemDelete}
              />
              <div style={{ borderBottom: "4px solid grey", marginBottom: 10 }}></div>
              <Grid container xs={12}>
                <Grid item xs={7}>
                  <Grid container xs={12} style={{ marginTop: 10,marginLeft:5 }}>
                    <Grid item xs={6}>
                      SUB TOTAL
              </Grid>
                    <Grid item xs={6} align="right">
                      {this.state.deleted ?
                         Number(totalAmount).toFixed(2): Number(this.props.totalPrice).toFixed(2)}
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
                    >
                      CHECKOUT
              </Button>
                  </Grid>

                </Grid>
              </Grid>
            </div>

          </DialogContent>
        </Dialog>
      </>
    );
  }
}
