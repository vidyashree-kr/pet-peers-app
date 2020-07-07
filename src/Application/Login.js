import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { withRouter } from 'react-router'
import { Grid, Button, TextField } from '@material-ui/core'
import Background from "../assets/logo.jpg";
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo'

const GET_USER_Details = gql`
  {
    email @client
    password @client
  }
`;

export default function Login(props) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [erroMessage, setErroMessage] = React.useState("")
  const [register, setRegister] = React.useState(false)
  const [mobile, setMobile] = React.useState(null)
  const {loading,data,error,client}=useQuery(GET_USER_Details)
  const {email:Email,password:Password}={...data}
 
  const handleLogin = () => {
    if (email === Email&& password === Password) {
      console.log('hi',data,Email)
      props.history.push("/dashboard")
    }
    else {
      setErroMessage('Please Enter Valid Email and Password')
    }
  };

  const handleEmailChange = e => {
    const userEmail = e.target.value;
    setEmail(userEmail);
  };

  const handleMobileChange = e => {
    const userMobile = e.target.value;
    setMobile(userMobile);
  };

  const handlePwdChange = e => {
    const userPwd = e.target.value;
    setPassword(userPwd);
  };

  const handleRegister = (e) => {
    e.preventDefault()
    setRegister(true)
    setErroMessage(null)
  }
  const validateEmail = (email) => { //Validates the email address
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
  }

  const validatePhone = (phone) => { //Validates the phone number
    var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; 
    return phoneRegex.test(phone);
  }

  const doValidate = () => {
    return !validateEmail(email) || !validatePhone(mobile)
  }

  const submitRegister = (e) => {
    if (email && password && mobile) {
      if (!doValidate()) {
        client.writeData({ data: { email: email } })
        client.writeData({ data: { password: password } })
        props.history.push("/dashboard")
      }
      else {
        setErroMessage('Enter valid Email and Mobile number')
      }
    }
    else {
      setErroMessage('Please Enter All the details correctly')
    }
  }

  const handleBackBtn = () => {
    setRegister(false)
    props.history.push('/login')
  }
  return (
    <Grid container xs={12} direction="row">
      <Grid item xs={6} align="left" style={{
        backgroundImage: `url(${Background})`,
        background: "% 0% no-repeat",
        width: "700px",
        height: "620px",
        opacity: 1
      }}></Grid>
      <Grid item xs={6} align="center" style={{
        background: "#FAFAFA 0% 0% no-repeat padding-box", background: "#FAFAFA 0% 0% no-repeat padding-box",
        boxShadow: "0px 0px 48px grey",
        borderRadius: "30px 0px 0px 30px",
        opacity: 1
      }}>
        <div style={{ padding: '100px 0px 20px 0px' }}> <b
          style={{
            color: 'blue',
            fontSize: "28px",
            fontFamily: "Proxima Nova"
          }}
        >
          Welcome to PET WORLD!
              </b></div>
        {register ? <p>Please Register below, by providing necessary details.</p> : null}
        <label
          style={{
            fontSize: "14px",
            marginRight: 310,
            fontWeight: "Regular",
            letterSpacing: 0,
            opacity: 1
          }}
        >
          Email:
              </label>
        <Grid item style={{ marginBottom: "20px" }}>
          <input
            required
            type="text"
            variant="outlined"
            style={{
              width: "350px",
              margin: '10px 0px 0px 5px',
              fontSize: "14px",
              height: "40px"
            }}
            onChange={e => handleEmailChange(e)}
            placeholder="Enter email adress"
          />
        </Grid>
        {register ? <> <label
          style={{
            fontSize: "14px",
            marginRight: 310,
            fontWeight: "Regular",
            letterSpacing: 0,
            opacity: 1
          }}
        >
          Mobile:
              </label>
          <Grid item style={{ marginBottom: "20px" }}>
            <input
              type="text"
              variant="outlined"
              style={{
                width: "350px",
                margin: '10px 0px 0px 5px',
                fontSize: "14px",
                height: "40px"
              }}
              onChange={e => handleMobileChange(e)}
              placeholder="Enter Mobile Number"
            />
          </Grid></> : null}
        <label
          style={{
            fontSize: "14px",
            top: "335px",
            marginRight: 290,
            fontWeight: "Regular",
            letterSpacing: 0,
            opacity: 1
          }}
        >
          Password:
              </label>
        <Grid item>
          <input
            type="password"
            variant="outlined"
            style={{
              width: "350px",
              margin: '10px 0px 0px 5px',
              fontSize: "14px",
              height: "40px"
            }}
            onChange={e => handlePwdChange(e)}
            placeholder="Enter Password"
          />
        </Grid>
        {!register ? <>
          <Grid item style={{ marginTop: "20px" }}>New User? {" "}
            <Link
              style={{
                font: "Bold 15px Proxima Nova",
                textDecoration: "none"
              }}
              href=""
              onClick={handleRegister}
            >
              Register Here
          </Link>
          </Grid>
          <Grid style={{ marginTop: "10px" }}>
            <Button
              onClick={handleLogin}
              style={{
                backgroundColor: "#00A29D",
                color: "white",
                width: "350px",
                height: "40px"
              }}
            >Login
          </Button>
            {erroMessage ? <p style={{ color: 'red' }}>{erroMessage}</p> : null}
            <Grid >
              <a
                style={{
                  font: "Bold 15px Proxima Nova",
                  textDecoration: "none", marginTop: "20px"
                }}
                href=""
              >
                Forgot Password?{" "}
              </a>
            </Grid>
          </Grid></> :
          <>
            <Grid container xs={12} direction="row">
              <Grid item xs={6} align="left">
                <Button
                  onClick={submitRegister}
                  style={{
                    backgroundColor: "#00A29D",
                    color: "white",
                    width: "100px",
                    height: "40px", marginTop: "30px", marginLeft: 160
                  }}
                >Submit
          </Button>
              </Grid>
              <Grid item xs={6} align="right">
                <Button
                  onClick={handleBackBtn}
                  style={{
                    backgroundColor: "#00A29D",
                    color: "white",
                    width: "100px",
                    height: "40px", marginTop: "30px", marginRight: 160
                  }}
                >Back
          </Button>
              </Grid>
            </Grid>
            {erroMessage ? <p style={{ color: 'red' }}>{erroMessage}</p> : null}
          </>
        }
      </Grid>
    </Grid>
  );
}
Login = withRouter(Login);

