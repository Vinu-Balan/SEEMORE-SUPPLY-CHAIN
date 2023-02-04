import React, {useState} from 'react'
import axios from "axios";
// import {GoogleLogin} from "react-google-login";
import {Link,useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

let user = "";
let loggedin = "/login";
const Login = (props) => {

    const [email,setEmail] = useState('');
    // const [category,setCategory] = useState('manufacturer');
    const [password,setPassword] = useState('');
    const [logged,setLogged] = useState(false);
    let history = useNavigate();

    const login = () => {

        const pwd = bcrypt.hashSync(password, salt);
    
        axios.post('http://localhost:2000/login', {
          username: email,
          password: pwd,
        //   category: category,
        }).then((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', res.data.user);
          // console.log("this is :"+localStorage.getItem('token'));
          // console.log(res);
          user = res.data.user;
          setLogged(true);
          // console.log(user);
          if(res.data.token){
            loggedin = "/home";
          }
        //   window.location.redirect('/');
        }).catch((err) => {
          if (err.response && err.response.data && err.response.data.errorMessage) {
            swal({
              text: err.response.data.errorMessage,
              icon: "error",
              type: "error"
            });
            loggedin = "/login";
          }
        });
      }

    return (
        <div className='login-container'>
        <div className='col signup-select'>
        <center><h1>Sign In</h1></center>
            <hr></hr>
            </div>
            <div className='col'>
           <center> <h3>Login to SEEMORE</h3></center>
        </div>
            <div className='input-div'>
            <label>Enter your email :</label>
            <input onChange={(e) => {setEmail(e.target.value)}} required type="email" placeholder='type your email here...' />
            </div>
            <div className='input-div'>
            <label>Enter your password :</label>
            <input required onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='type your password...' />
            </div>
            <Link to={loggedin}><center><button onClick={login}>Login</button></center></Link>
            
            <center><h2>New user? Create an account <Link to="/"><a>Signup</a></Link></h2></center>
        </div>
    )
}

export {user};
export default Login;
