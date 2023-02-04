import React,{useState,useEffect} from 'react'
import Header from './Header'
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate,Link} from "react-router-dom"

const PlaceOrder = () => {
  const history = useNavigate();
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

    const [trackData, setTrackData] = useState({
      man_id: "",
      ret_id: "",
      req_date: "",
      req_time: "",
      source: "",
      dest: "",
      contact: "",
    });

  const CreateTracker = () => {
    
    axios.post('http://localhost:2000/createtracker', {
      username: user,
      man_id: trackData.man_id,
      ret_id: trackData.ret_id,
      req_date: trackData.req_date,
      req_time: trackData.req_time,
      source: trackData.source,
      dest: trackData.dest,
      contact: trackData.contact
    }).then((res) => {
      swal({
        text: "Tracker Created Successfully",
        icon: "success",
        type: "success"
      });
      setTrackData({
        man_id: "",
        ret_id: "",
        req_date: "",
        req_time: "",
        source: "",
        dest: "",
        contact: ""
      });
    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <div>
      <Header />
      <div className='place-order-outer'>
        <div className='retailers-list place-order-container'>
            <h3>Create a New order</h3>
            <hr></hr>
            <div>
            <div className='bid-details profile-cont place-order-container'>
            <span>Enter the manufacturer ID:</span>
            <input
            type="text" onChange={(e) => setTrackData({ ...trackData, man_id: e.target.value })} className='location-text' width="100%"
          />          
            <span>Enter the retailer ID:</span>
            <input
            type="text" onChange={(e) => setTrackData({ ...trackData, ret_id: e.target.value })}  className='location-text' width="100%"
          />  
            <span>Enter the requsted date of arrival:</span>
            <input
            type="text" onChange={(e) => setTrackData({ ...trackData, req_date: e.target.value })}  className='location-text' width="100%"
          />  
            <span>Enter the requsted time of arrival:</span>
            <input
            type="text" onChange={(e) => setTrackData({ ...trackData, req_time: e.target.value })}  className='location-text' width="100%"
          />  
            <span>Enter the Source:</span>
            <input
            type="text" onChange={(e) => setTrackData({ ...trackData, source: e.target.value })}  className='location-text' width="100%"
          />  
            <span>Enter the Destination:</span>
            <input
            type="text" onChange={(e) => setTrackData({ ...trackData, dest: e.target.value })}  className='location-text' width="100%"
          />  
          <span>Enter the Contact details:</span>
            <input
            type="text" onChange={(e) => setTrackData({ ...trackData, contact: e.target.value })}  className='location-text' width="100%"
          />  
          <br></br>
          <Link to="/trackgoods">
          <button onClick={CreateTracker} className='profile-edit'>Create Tracker</button>
          </Link>
            </div>
            </div>
        </div>
    </div>
      </div>
  )
}

export default PlaceOrder