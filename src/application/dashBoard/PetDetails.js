import React from 'react'
import { Grid, Button } from '@material-ui/core';

const PetDetails = (props)=>{
    return(
        <Grid  style={{display:'inline',margin:5}} >
        <td>
           <div style={{ padding: 10,boxShadow: "0px 1px 6px #2C2C2C1C" }}>
           <div>
             <img src={require(`../../assets/${props.pet.src.toLowerCase()}.jpg`)}
              width="290px" height="200px" />
             </div>
             <Grid container xs={12} direction="row" >
             <Grid item xs={10} align="left" >
            <div style={{fontWeight:'bold'}}>{props.pet.name.toUpperCase()}</div>
            <div style={{fontSize:13}}>{props.pet.description}</div>
           </Grid>
           <Grid item xs={2} align="right">${Number(props.pet.price).toFixed(2)}
           </Grid>
           </Grid>
          <Grid container xs={12} direction="row" style={{marginTop:5}}> <Grid item xs={6} align="left" >
             <Button
               variant="outlined"
               style={{ textTransform: 'none',width:'90%' }}
               onClick={e => props.handleAdd(e, props.pet)}>Add To Cart</Button>
           </Grid>
           <Grid item xs={6} align="right"><Button
             variant="outlined"
             style={{ textTransform: 'none',width:'90%' }}
             onClick={e => props.handleBuy(e, props.pet)}>Buy Now</Button></Grid></Grid>
           </div>
         </td>
         </Grid>
    )
}
export default PetDetails