import React, {useState} from 'react'
import axios from "axios";
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const initialState = {
    username: "",
    password: ""
}
const Signup = (props) => {
  let history = useNavigate();
    
    const [email,setEmail] = useState('');
    // const [category,setCategory] = useState('manufacturer');
    const [password,setPassword] = useState('');
    const [formData,setFormData] = useState(initialState);

    // async function submit(e){
    //     e.preventDefault();
    //     setFormData({
    //         username: email,
    //         password: password
    //     })
    //     console.log(formData);
    //   }

    async function register(){

            axios.post('http://localhost:2000/signup', {
              username: email,
              password: password,
            }).then((res) => {
              console.log(res);
              swal({
                text: res.data.title,
                icon: "success",
                type: "success"
              });
              window.location.redirect('/login');
            }).catch((err) => {
              try{
                swal({
                  text: err.response.data.errorMessage,
                  icon: "error",
                  type: "error"
                });
              }catch(e){
                console.log(e);
              }
              
            });
          }
        
    return (
        <div className='login-container'>
        <div className='col signup-select'>
        <center><h1>Signup</h1></center>
            <hr></hr>
            <div className='col'>
           <center> <h3>Create your SEEMORE account</h3></center>
        </div>
{/*             
            <select required 
            onChange={(e) => {setCategory(e.target.value)
            setFormData({...formData,category:category})}} 
            name="category" default = "" id="category">
            <option className='options' selected value="manufacturer">Manufacturer</option>
            <option className='options' value="retailer">Retailer</option>
            <option className='options' value="distributor">Distributor</option>
            </select> */}
            </div>
            <div className='input-div'>
            <label>Enter your email :</label>
            <input onChange={(e) => {setEmail(e.target.value)
            setFormData({...formData,username:email})}} required type="email" placeholder='type your email here...' />
            </div>
            <div className='input-div'>
            <label>Enter your password :</label>
            <input required onChange={(e) => {setPassword(e.target.value)
            setFormData({...formData,password:password})}} type="password" placeholder='type your password...' />
            </div>
            <Link to="/login"><center><button onClick={register}>Register</button></center></Link>
            <center><h2>Already have an account <Link to="/login"><a>SignIn</a></Link></h2></center>
        </div>
    )
}

export default Signup