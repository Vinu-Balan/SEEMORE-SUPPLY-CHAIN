import React,{Component, useEffect,useState} from 'react'
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Content = (props) => {
  const [user, setUser] = useState("");
  const [typeval, setType] = useState("");
  useEffect(() => {
    getUserID();
    getUserProfile();
  }, []);
  const getUserID = () => {
    axios
    .get("http://localhost:2000/userget")
    .then(data => {
      setUser(data.data.user);
    })
    .catch(error => console.log(error));
    };
    const getUserProfile = () => {
      axios
      .get("http://localhost:2000/userprofile")
      .then(data => {
        // console.log(data.data.details[0].type)
        setType(data.data.details[0].type)
      })
      .catch(error => console.log(error));
      };
  return (
    <div>
      <Header />
      <div className='Contentback'>
        <div className='Content'>
    <center className='tag-content'>
    <h1>SEEMORE</h1>
        <span>Track your products and get connected over the globe</span>
    </center>
    <div className='option-content'>
        <div className='chat-content'>
        <h3>
        Track your goods
        </h3>
        <br></br>
        <Link to="/trackgoods">
        <button type='button' className='start'>
        <a href='#'>Explore</a>
        </button>
        </Link>
        </div>
        <div className='chat-content'>
        <h3>
        Find Retailers
        </h3>
        <br></br>
        <Link to="/retailers" >
        <button type='button' className='start'>
        <a href='#'>Explore</a>
        </button>
        </Link>
        </div>
        <div className='chat-content'>
        <h3>
        Find Manufacturers
        </h3>
        <br></br>
        <Link to="/manufacturers">
        <button type='button' className='start'>
        <a href='#'>Explore</a>
        </button>
        </Link>
        </div>
        <div className='chat-content'>
        <h3>
        View Distributors
        </h3>
        <br></br>
        <Link to="/distributors">
        <button type='button' className='start'>
        <a href='#'>Explore</a>
        </button>
        </Link>
        </div>
        {typeval=="distributor" ? (
          <div className='chat-content'>
        <h3>
        Place Orders
        </h3>
        <br></br>
        <Link to="/placeorder">
        <button type='button' className='start'>
        <a href='#'>Explore</a>
        </button>
        </Link>
        </div>
        ) : (<></>)}
    </div>     
    </div>
    </div>
    </div>
  )
}

export default Content