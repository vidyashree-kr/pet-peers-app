import React from 'react'
import { Grid } from '@material-ui/core';
import PetDetails from './PetDetails'

const Layout = (props) =>{
    return (
      <div style={{ margin: '10px 20px 0px 20px' }}>
        <Grid item>
          {props.petName || props.searched ? (
            <table>
              <tbody>
                {props.searched && props.searchData.length === 0 ? <div>No Data Found</div> : null}
                {!props.searched ? props.petName : props.searched ?
                  props.searchData.map((pet, index) => (
                    <PetDetails pet={pet} handleAdd={(e) => props.handleAdd(e, pet)}
                      handleBuy={(e) => props.handleBuy(e, pet)} />
                  )) : null}

              </tbody>
            </table>
          ) :
            props.data.map((pet, index) => (
              <PetDetails pet={pet} handleAdd={(e) => props.handleAdd(e, pet)}
                handleBuy={(e) => props.handleBuy(e, pet)} />
            ))}
        </Grid>

      </div>
    );
  }

  export default Layout