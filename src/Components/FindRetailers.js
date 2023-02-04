import React,{useState,useEffect} from 'react'
import { Dots, ProgressBar,Waves } from 'loading-animations-react';
import acc from "../images/account.png"
import Header from './Header'
import axios from 'axios'

const FindRetailers = (props) =>  {
    const [isloaded,setLoad] = useState(false);
    const [Data,setData] = useState({details:[{
            bio: "",
            contact: "",
            location: "",
            name: "",
            type: "",
            username: ""
    }]});
    const searchRetailers =() =>{
        axios
    .get("http://localhost:2000/getretailers")
    .then(data => {
      setData(data.data);
      // console.log(data.data);
    })
    .catch(error => console.log(error));
    }

    const [user, setUser] = useState("");
  useEffect(() => {
    setLoad(false);
    getUserID();
    searchRetailers();
  }, []);
  const getUserID = () => {
    axios
    .get("http://localhost:2000/userget")
    .then(data => {
      setUser(data.data);
      setLoad(true);
    })
    .catch(error => console.log(error));
    };

    const [search,setSearch] = useState('');

    const handleChange = (e) =>{
        setSearch(e.target.value);
    }
  return (
    <div>
        <Header />
        <div className='retailers-content'>
        {/* <div className='search-container row'>
        <i class="fa fa-search" aria-hidden="true"></i>
      <input class="search-bar focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Find Retailers..." />
        </div> */}
        <div className='retailers-list'>
            <h3>Available Retailers</h3>
            {isloaded && Data.details[0].name!="" ? Data.details.map(manu =>(
                <div className='retailer-search-result row'>
                <img src={acc} className="search-profile-pic" alt='dist_photo' />
            <div className='search-profile col'>
                <h3>{manu.name}</h3>
                <span className='location-text'>Location: {manu.location}</span>
                <span className='location-text'>Type: {manu.type}</span>
                <span className='search-contact'>Contact: {manu.contact}</span>
            </div>
            </div>
            )): (<>
                <Waves className="waves" waveColor="cyan" backgroundColor="#000" height="50px" />
            </>)
            }
        </div>
    </div>
    </div>
    
  )
}

export default FindRetailers;