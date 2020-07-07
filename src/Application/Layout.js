import React from 'react'
import { Grid, Button,TextField } from '@material-ui/core';
import Cart from './Cart'
import Rabbit from "../assets/rabbit.jpg";
import Dog from "../assets/dog.jpg";
import bullDog from "../assets/bulDog.jpg";
import Cat from "../assets/cat.jpg";
import Dog2 from "../assets/dog2.jpg";
import axios from 'axios';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      petName: null,
      open: false,
      searched: false,
      myCart: [],
      data: [
        {
          name: "Rabbit",
          price: 17,
          src:Rabbit
        },
        {
          name: "French bull dog",
          price: 17,
          src:Dog2
        },
        {
          name: "Cat",
          price: 16,
          src:Cat
        },
        {
          name: "German Shepherd",
          price: 18,
          src:Dog
        },
        {
          name: "Bull Dog",
          price: 25,
          src:bullDog
        },
        {
          name: "Poodle",
          price: 37,
          src:Dog
        },
        { name: "Beagle", price: 27,
        src:Rabbit }
      ],
      filterText: 0,
      searchData: [], totalPrice: 0
    };
  }

  // componentDidMount(){
  //   axios.get(`https://my-json-server.typicode.com/vidyashree-kr/json-server`)
  //   .then(res => {
  //     const pets = res.data;
  //     console.log('data',pets,res)
  //     this.setState({ data:pets });
  //   })
  // }
  handleSearch = e => {
    e.preventDefault();
    const filterText = e.target.value;
    if (this.state.petName) {
      this.setState({ petName: null });
      this.petSearch(filterText);
    }
    else {
      this.setState({ filterText })
      this.petSearch(filterText);
    }
  };

  petSearch = filterText => {
    const { data } = this.state;
    try {
      if (filterText.length >= 1) {
        const filterData = data.filter(pet => {
          const name = pet.name.toLowerCase();
          const filterValue = filterText.toLowerCase();
          return (
            name.startsWith(filterValue)
          );
        });
        this.setState({ searchData: filterData });
        this.setState({ searched: true })
      }else if(filterText.length ===0){
        this.setState({ searchData: data }); 
      }
    } catch (e) { }
  };
  handleClickOpen = (e) => {
    const { myCart } = this.state
    this.setState({ open: true });
    if (myCart.length !== 0) {
      const total = myCart.reduce((a, b) => ({ price: a.price + b.price }));
      this.setState({ totalPrice: total.price });
    }
    else {
      this.setState({ totalPrice: 0 })
    }
  };
handleBuy=(e,pet)=>{
  try {
    const { myCart } = this.state
    var obj = {};
    var Arr = [];
    const name = pet.name
    const price = pet.price
    const src=pet.src
    obj["name"] = name;
    obj["price"] = price;
    obj["src"] = src;
    Arr.push(obj);
    myCart.push(obj)
    this.setState({ myCart: myCart })
    this.handleClickOpen()
  } catch (e) { }
  
}
  handleClose = () => {
    this.setState({ open: false });
  };
  handleAdd = (e, pet) => {
    try {
      const { myCart } = this.state
      var obj = {};
      var Arr = [];
      const name = pet.name
      const price = pet.price
      const src=pet.src
      obj["name"] = name;
      obj["price"] = price;
      obj["src"] = src;
      Arr.push(obj);
      myCart.push(obj)
      this.setState({ myCart: myCart })
    } catch (e) { }
  };

  render() {
  
    return (
      <div style={{ margin:'10px 20px 0px 20px' }}>
        <Grid container xs={12} direction="row">
          <Grid item xs={6} align="left">
            <TextField
            style={{ width:320,marginBottom:10}}
            variant="outlined"
            onChange={e => this.handleSearch(e)}
            placeholder="Search your favorite pet here..."
            />
            </Grid>
          <Grid item xs={6} align="right">
            <div style={{ marginBottom: 5, fontWeight: 'bold' }}>My Cart Items: {this.state.myCart.length}</div>
            <div><Button style={{
              textDecoration: "none", color: "green",
              fontSize: 14, fontWeight: 'bold', border: '1px solid green', padding: 2
            }}
              onClick={e => this.handleClickOpen(e)}
            >Go to Your Cart
                </Button>
            </div>
          </Grid >
        </Grid>
        <Grid item>
          {this.state.petName || this.state.searched ? (
            <table>
              <tbody>
                {this.state.searched && this.state.searchData.length === 0 ? <div>No Data Found</div> : null}
                {!this.state.searched ? this.state.petName : this.state.searched ? this.state.searchData.map(pet => {
                  return (
                    <tr style={{boxShadow: "0px 1px 6px #2C2C2C1C"}}>
                      <td style={{paddingRight:20}}><img src={pet.src} width="100px" height="80px" /></td>
                       <td style={{paddingLeft:20}}>{pet.name}</td>
                      <td style={{paddingLeft:20}}>{Number(pet.price).toFixed(2)}</td>
                      <td style={{paddingLeft:20}}><Button
                        variant="outlined"
                        style={{ textTransform: 'none' }}
                        onClick={e => this.handleAdd(e, pet)}>Add To Cart</Button></td>
                        <td style={{paddingLeft:5}}><Button
                        variant="outlined"
                        style={{ textTransform: 'none' }}
                        onClick={e => this.handleBuy(e, pet)}>Buy Now</Button></td>
                        </tr>
                  )
                }) : null}

              </tbody>
            </table>
          ) : <table>
              {this.state.data.map((pet, index) => (
                <tbody>
                  <tr style={{boxShadow: "0px 1px 6px #2C2C2C1C"}}>
                  <td style={{paddingRight:20}}><img src={pet.src} width="100px" height="80px" /></td>
                    <td> {pet.name}</td>
                    <td> {Number(pet.price).toFixed(2)}</td>
                    <td style={{paddingLeft:20}}>
                      <Button
                        variant="outlined"
                        style={{ textTransform: 'none' }}
                        onClick={e => this.handleAdd(e, pet)}>Add To Cart</Button>
                    </td>
                    <td style={{paddingLeft:5}}><Button
                        variant="outlined"
                        style={{ textTransform: 'none' }}
                        onClick={e => this.handleBuy(e, pet)}>Buy Now</Button></td>
                  </tr>
                </tbody>))}
            </table>}
        </Grid>
        <Cart
          handleClose={this.handleClose}
          open={this.state.open}
          cartItem={this.state.myCart}
          totalPrice={this.state.totalPrice}
          handleClickOpen={this.handleClickOpen}
        />
      </div>
    );
  }
}
