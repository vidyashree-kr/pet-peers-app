import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'
import Header from "../../shared/Header"
import axios from 'axios'
import{Grid} from '@material-ui/core'
import OrdersTable from "./OrdersTable";

export default class MyOrders extends Component {
  constructor() {
    super();
    this.state = {
      myOrders:[]
    };
  }
//getting ordered items from the server
getMyOrders = () => {
    axios.get(`http://localhost:3002/myOrder`)
      .then(res => {
        const pets = res.data;
        this.setState({myOrders:pets})
      })
  }

async componentDidMount(){
await this.getMyOrders()
}

   handleBackLink=()=>{
    this.props.history.push('/dashboard')
  }
  
  render() {
    return (
      <div>
        <Header disabled={true}/>
        <div style={{ marginLeft: 10,marginRight:10 }}>
            {this.state.myOrders.length===0 ?
            <div><h3>You have not placed any orders yet</h3>
             <Link onClick={this.handleBackLink} style={{ fontWeight: 'bold', fontSize: 20 }}>Shop Now</Link>
            </div> : <>
            <Grid container xs={12} direction="row">
                <Grid item xs={6} align="left">
                <h2>My Orders</h2>
                </Grid>
                <Grid item xs={6} align="right">
                <Link onClick={this.handleBackLink} style={{ fontWeight: 'bold', fontSize: 20 }}>Continue Shopping</Link>
                </Grid>
            </Grid>
          <OrdersTable
            myOrder={this.state.myOrders}
          /></>}
        </div>
      </div>
    );
  }
}
MyOrders = withRouter(MyOrders);
