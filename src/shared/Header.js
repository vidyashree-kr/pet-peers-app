import React from "react";
import { Grid ,Button} from "@material-ui/core";
import Logo from '../assets/logo.jpg'
import { withRouter } from 'react-router'
import gql from 'graphql-tag';
import { useQuery} from 'react-apollo'
const GET_USER_Details = gql`
  {
    email @client
    password @client
  }
`;

export default function Header(props) {
  const {loading,data,error,client}=useQuery(GET_USER_Details)
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const {email:Email}={...data}

  const handleLogout=()=>{
    props.history.push("/")
  }

  return (
    <Grid container xs={12}>
      <nav>
        <header
          style={{
            width: "1345px",
            height: "60px",
            backgroundColor: "blue",
              color: "white",
            boxShadow: "0px 1px 6px #2C2C2C1C",
            opacity: 1
          }}
        >
          <Grid xs={12} container direction="row" style={{marginLeft:10}}>
            <Grid item xs={4} align="left">
              <img src={Logo} width="80px" height="60px" style={{borderRadius:'50%'}}></img></Grid>
              <Grid item xs={4} align="center" style={{color:'white',fontWeight:'bold',fontSize:24,marginBottom:10}}>
                PET WORLD</Grid>
               
            <Grid item xs={4} align="right">
        <Grid item>Logged in as: <b>{Email}</b> &nbsp;&nbsp;&nbsp;</Grid>
            <Grid item><Button
          onClick={handleLogout}
            style={{
              width: "90px",
              height: "30px",textTransform:'none',color:'white',fontSize:'16px',fontWeight:'bold'
            }}
          >Logout
          </Button></Grid></Grid>
          </Grid>
        </header>
      </nav>
    </Grid>
  );
}
Header = withRouter(Header);