import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'
import { Grid, Button } from '@material-ui/core'
import Background from "../../assets/logo.jpg";
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo'
import axios from 'axios'

const GET_USER_Details = gql`
  {
    email @client
    password @client
  }
`;

export default function Login(props) {
  const [erroMessage, setErroMessage] = useState(null)
  const [register, setRegister] = useState(false)
  const [usersData, setUsersData] = useState([])
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const mobileRef = useRef(null)

  const { loading, data, error, client } = useQuery(GET_USER_Details)

  //getting user details from the server
  useEffect(() => {
  getUsersData()
  }, [])

  const getUsersData=()=>{
    axios.get(`http://localhost:3002/users`)
    .then(res => {
      const users = res.data;
      console.log('data', users, res)
      setUsersData(users);
    })
  }

  //handles login button click
  const handleLogin = () => {
    let email = emailRef.current.value
    let password = passwordRef.current.value
    const existingUser = usersData.some(item => item.email === email && item.password === password);
    if (existingUser) {
      props.history.push("/dashboard")
      client.writeData({ data: { email: email } })
      client.writeData({ data: { password: password } })
    }
    else {
      setErroMessage('Please Enter Valid Email and Password')
    }
  };

  //handles register button click
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

  const doValidate = (email, mobile) => { //validtes phone and email
    return !validateEmail(email) || !validatePhone(mobile)
  }

//add registered user to the users list
  const addToUsers = (user) => {
    try {
      if (erroMessage === null) {
        axios.post(`http://localhost:3002/Users`, user).then(res => { })
      }
    } catch (e) { console.log('e', e.message) }
  }

  //handles register button click
  const submitRegister = async(e) => {
    let email = emailRef.current.value
    let mobile = mobileRef.current.value
    let password = passwordRef.current.value
    const existingUser = usersData.some(item => item.email === email);
    if (email && password && mobile) {
      let user = { email, mobile, password }
     await addToUsers(user)
     getUsersData()
      if (!doValidate(email, mobile)) {
        if (!existingUser) {
         emailRef.current.value=''
         mobileRef.current.value=''
        passwordRef.current.value=''
          props.history.push("/")
          setErroMessage(null)
          setRegister(false)
        }
        else {
          setErroMessage('User already exists')
        }
      }
      else {
        setErroMessage('Enter valid Email and Mobile number')
      }
    }
    else {
      setErroMessage('Please Enter All the details correctly')
    }
  }

//handles back button click in registration page
  const handleBackBtn = () => {
    setRegister(false)
    props.history.push('/')
  }

  return (
    <Grid container xs={12} direction="row">
      <Grid item xs={6} align="left" >
        <div style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '700px 680px',
          width: "660px",
          height: "575px",
          opacity: 1
        }}></div>
      </Grid>
      <Grid item xs={6} align="center" style={{
        background: "#FAFAFA 0% 0% no-repeat padding-box",
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
            ref={emailRef}
            autoFocus={true}
            type="text"
            variant="outlined"
            style={{
              width: "350px",
              margin: '10px 0px 0px 5px',
              fontSize: "14px",
              height: "40px"
            }}
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
              ref={mobileRef}
              type="text"
              variant="outlined"
              style={{
                width: "350px",
                margin: '10px 0px 0px 5px',
                fontSize: "14px",
                height: "40px"
              }}
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
            ref={passwordRef}
            type="password"
            variant="outlined"
            style={{
              width: "350px",
              margin: '10px 0px 0px 5px',
              fontSize: "14px",
              height: "40px"
            }}
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

