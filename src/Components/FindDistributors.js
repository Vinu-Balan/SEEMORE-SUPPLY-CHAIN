import React,{useEffect,useState} from 'react';
import { Dots, ProgressBar,Waves } from 'loading-animations-react';
import acc from "../images/account.png"
import Header from './Header';
import axios from 'axios';


export default function FindDistributors(){
    const [isloaded,setLoad] = useState(false);
    const [Data,setData] = useState({details:[{
            bio: "",
            contact: "",
            location: "",
            name: "",
            type: "",
            username: ""
    }]});
    const searchDistributors =() =>{
        axios
    .get("http://localhost:2000/getdistributors")
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
    searchDistributors();
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
    return(
        <div>
            <Header />
            <div className='retailers-content'>
        {/* <div className='search-container row'>
        
        <i class="fa fa-search" aria-hidden="true"></i>
      <input class="search-bar focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Find Manufacturers..." />
        </div> */}
        <div className='retailers-list'>
            <h3>Available Distributors</h3>
            {isloaded && Data.details[0].name!="" ? Data.details.map(manu =>(
                <div className='retailer-search-result row'>
                <img src={acc} className="search-profile-pic" alt='dist_photo' />
            <div className='search-profile col'>
                <h3>{manu.name}</h3>
                <span className='location-text'>Location: {manu.location}</span>
                <span className='location-text'>Type: {manu.type}</span>
                <span className='search-contact'>Contact: {manu.contact}</span>
                <span className='search-contact'>Bio: {manu.bio}</span>
            </div>
            </div>
            )): (<>
                <Waves className="waves" waveColor="cyan" backgroundColor="#000" />
            </>)
            }
        </div>
    </div>
        </div>
        
    )
};