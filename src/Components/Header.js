import React from 'react'
import { useState,useEffect } from 'react';
import {Link,Navigate} from 'react-router-dom';
import acc from "../images/account.png";
import axios from 'axios';


const Header = (props) => {
    const [user, setUser] = useState("");
  useEffect(() => {
    getUserID();
  }, []);
  const getUserID = () => {
    axios
    .get("http://localhost:2000/userget")
    .then(data => {
      setUser(data.data.user);
    })
    .catch(error => console.log(error));
    };
    const [state, setstate] = useState("Logout");

    let username = user;
function setLogin(){
    if(state==="Login"){
        // if(username!=""){
            setstate(state => "Logout")
        // }
        console.log(state);
    }
    if(state==="Logout"){
        username = "";
        setstate(state => "Login")
        console.log(state);
    }
}
    return (
        <div className='Header'>
        <div className='row'>
        <Link to="/home"><div className='logo'>SEEMORE</div>
        </Link>
            <div className='menu'>
                <ul>
                <Link to="/home">
                    <li>Home</li>
                </Link>
                <Link to="/trackgoods">
                <li>Track Goods</li>
                </Link>
                <Link to="/manufacturers">
                <li>Manufacturers</li>
                </Link>
                <Link to="/retailers">
                <li>Retailers</li>
                </Link>
                <Link to="/distributors">
                <li>Distributors</li>
                </Link>
                </ul>
            </div>
        </div>
        
        <div className='row-logo-login'>
        <h3>{user}</h3>
        <Link to="/profile">
        <img src={acc} alt='head-photo'/>
        </Link>
        <Link to='/login' >
        <a href="" className='logins' id="signin" onClick={setLogin}>{state}</a>
        </Link>
        </div>
        </div>
      )
}
export default Header;