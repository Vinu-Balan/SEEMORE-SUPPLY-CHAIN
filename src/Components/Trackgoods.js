import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import { Dots, ProgressBar,Waves } from 'loading-animations-react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Trackgoods = (props) => {
    const [isloaded,setLoad] = useState(false);
    const [typeval, setType] = useState("");
    const [Data,setData] = useState({details:[{
        pack_id: 0,
        man_id: "",
        ret_id: "",
        req_date: "",
        req_time: "",
        source: "",
        dest: "",
        contact: ""
    }]});
    useEffect(() => {
        setLoad(false);
        getUserProfile();
        // console.log(typeval);
        getTrackDetails();
      }, []);
    const getUserProfile = () => {
        axios
        .get("http://localhost:2000/userprofile")
        .then(data => {
        //   console.log(data.data.details[0].type)
          setType(data.data.details[0].type)
        })
        .catch(error => console.log(error));
        };
    const getTrackDetails = () => {
        axios
        .post("http://localhost:2000/gettracker",{
            type: typeval
        })
        .then(data => {
          // console.log(data.data.details[0].type)
          setData(data.data)
        //   console.log(Data);
          setLoad(true);
        })
        .catch(error => console.log(error));
        };
    const packageDelivered = (pack_id) =>{
        // console.log(pack_id);
        if(pack_id==null){
          pack_id = 0;
        }
        axios
        .post("http://localhost:2000/delivered",{
            package_id : pack_id
        })
        .then(data => {
          // console.log(data.data.details[0].type)
          setData(data.data)
          // console.log(Data);
          setLoad(true);
        })
        .catch(error => console.log(error));
        };

  return (
    <div>
    <Header />
        <div className='Contentback'>
        <div className='Content'>
    <center className='tag-content'>
    <h1>Track your packages</h1>
    <br></br>
    <hr>
    </hr>
    <br></br>
    <h2 className='cur-del-text'>Currently On Delivery</h2>
    </center>
    <div className='packages'>
    {isloaded ? Data.details.map( pack =>(
        <div className='package'>
        <h3>Package ID: {pack.pack_id}</h3>
        <h3>From: {pack.source}</h3>
        <h3>To: {pack.dest}</h3>
        <span>Requested date of arrival:<br></br> {pack.req_date}</span>
        <span>Requested time of arrival:<br></br> {pack.req_time}</span>

    <button>
        Contact: {pack.contact}
    </button>
    <br></br>
    {typeval=="distributor"? (<>
        <span>Click the below button to complete the delivery</span>
        <button onClick={() =>{
          packageDelivered(pack.pack_id);
          getTrackDetails();
        }} className='package-delivered'>
        Package Delivered
    </button>
    </>): (<></>)} 
 
    </div>
    )):(<>
        <Waves waveColor="cyan" className="waves" backgroundColor="#000" height="50px" />
    </>)}
    {Data.details.length==0 ? <>
      <div className='package'>
        <h3>Currently No orders to track</h3>
      </div>
    </>: <></>}
    </div>
    </div>
    </div>
    </div>
    
    
  )
}

export default Trackgoods;