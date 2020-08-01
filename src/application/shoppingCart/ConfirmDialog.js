import React, { useRef, useState } from 'react'
import { Grid, Button, Dialog, DialogContent, TextareaAutosize } from '@material-ui/core';
import closeicon from "../../assets/close.png";
import { withRouter } from 'react-router'
import axios from 'axios'

export default function CheckoutDialog(props) {
  const addressRef = useRef("")
  const [open, setOpen] = useState(false)
  const [errorM, setErrorM] = useState(null)

  //handles confirm button click for the final order confirmation
  const handleConfirm = async() => {
    let address = addressRef.current.value
    if (address !== "") {
      setOpen(true)
      console.log('open',open)
      setTimeout(handleClose(), 4000);
      setErrorM(null)
      // alert("You have successfully placed your order")
      await addItemsToMyOrder()
      // props.handleOrder()
      props.handleClose()
      props.history.push('/dashboard')
      // props.handleClear()
    } else {
      setErrorM("Please Enter your Address")
    }
  }

  //add ordered item to the myorders list
  const addItemsToMyOrder=()=>{
    props.cartItems.map((order=>{
      console.log('last',order)
      try{
        axios.post(`http://localhost:3002/myOrder`, order).then(res => {
          const pets = res.data;
      if(pets){
        for(var i=0; i<=pets.length;i++){
          var id=pets[i].id
          console.log('id',id)
        }
          // axios.delete(`http://localhost:3002/myCart/${id}`).then(result => {
          // console.log('delete',result)
        // })
      }
      })
      }
      catch(e){
        console.log(e.message)
      }
      }))
  }

  //handles dialog close
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog
        onClose={props.handleClose}
        open={props.open}
      >
        <div align="right" style={{ margin: 10 }}>
          <img
            onClick={props.handleClose}
            width="20px"
            height="20px"
            src={closeicon}
            style={{ cursor: 'pointer' }}
          ></img>
        </div>
        <DialogContent>
          <div style={{ marginLeft: 10 }}>
            <h4>Address details</h4>
            <label
              style={{
                fontSize: "14px",
                marginRight: 310,
                fontWeight: "Regular",
                letterSpacing: 0,
                opacity: 1
              }}
            >
              Address:
              </label>
            <Grid item style={{ marginBottom: "20px" }}>
              <TextareaAutosize
                name="address"
                ref={addressRef}
                style={{
                  width: "300px",
                  fontSize: "14px"
                }}
                placeholder="Enter your full Address"
              />
            </Grid>
            <Grid style={{ marginBottom: 10 }}>
              Shiiping: <b>Free</b>
            </Grid>
            <Grid style={{ marginBottom: 10 }}>
              Number of Items: <b>{props.cartItems.length}</b>
            </Grid>
            <Grid style={{ marginBottom: 10 }}>
              Payment Method: <b>Cash On Delivery(COD)</b>
            </Grid>
            <div style={{ borderBottom: "4px solid grey", marginBottom: 10 }}></div>
            <Grid container xs={12}>
              <Grid item xs={7}>
                <Grid container xs={12} style={{ marginTop: 10, marginLeft: 5 }}>
                  <Grid item xs={6}>
                  Total Amount:
                </Grid>
                  <Grid item xs={6} align="right">
                    <b>${Number(props.totalAmount).toFixed(2)}</b>
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
                    onClick={handleConfirm}
                  >
                    Confirm
                </Button>
                </Grid>
                {errorM ? <p style={{ color: 'red' }}>{errorM}</p> : null}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
      <successDialog
      open={open}
      handleClose={handleClose}
      />
    </>
  );
}
CheckoutDialog = withRouter(CheckoutDialog);
