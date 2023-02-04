import React,{useState,useEffect} from 'react';
import acc from "../images/account.png"
import Header from './Header';
import axios from 'axios';

export default function Profile(){

    /* fetching current user */ 
  const [user, setUser] = useState("");
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

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Your Name",
    location: "Your Location",
    contact: "Your contact",
    type:   "What type of organization",
    bio: 'short bio',
  });

  const UpdateProfile = () => {

    axios.post('http://localhost:2000/profile', {
      username: user,
      name: profile.name,
      location: profile.location,
      contact: profile.contact,
      type: profile.type,
      bio: profile.bio
    //   category: category,
    }).then((res) => {
    //   console.log(res);
    }).catch((err) => {
    //   console.log(err);
    });
  }
  const getUserProfile = () => {
    axios
    .get("http://localhost:2000/userprofile")
    .then(data => {
      // console.log(data.data.details[0].type)
      setProfile({
        username: user,
      name: data.data.details[0].name,
      location: data.data.details[0].location,
      contact: data.data.details[0].contact,
      type: data.data.details[0].type,
      bio: data.data.details[0].bio
      })
    })
    .catch(error => console.log(error));
    };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Save profile changes here
    console.log(profile.name)
    UpdateProfile();
    setIsEditing(false);
  };
    return(
        <div>
      <Header user={user} />
      <div className='retailers-content prof profile-top'>
        <div className='retailers-list'>
            <h3>User Profile</h3>
            <hr></hr>
            {!isEditing ? (
                <div className='retailer-search-result row prof'>
                <img src={acc} className="search-profile-pic" alt='dist_photo' />
            <div className='search-profile-edit col'>
            
            <div className='bid-details profile-cont'>
            <div className='row'>
            <h3>{profile.name}</h3>
            </div>  
            <div className='row'>
                <span className='location-text'>Location: {profile.location}</span>
                </div>
                <div className='row'>
                <span className='location-text'>Type: {profile.type}</span>
                </div>
                <div className='row'>
                <span className='search-contact'>Contact: {profile.contact}</span>
                </div>
                <div>
                <span className='profile-bio'>Bio: {profile.bio}</span>
                <button onClick={handleEditClick} className='profile-edit'>Edit</button>
                </div>
            </div>             
                
            </div>
            </div>
            ):(<>
            <div className='search-profile-edit col'>
            <div className='bid-details profile-cont'>
            <div className='edit-row'>
            <span className='location-text'>Enter the Name:</span>
            <input
            type="text" className='location-text' width="100%"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
            </div>
            <br></br>
            <div className='edit-row'>
            <span className='location-text'>Enter the Location:</span>
            <input
            type="text" className='location-text' width="100%"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          />          
            </div>
            <br></br>
            <div className='edit-row'>
            <span className='location-text'>Select the type:</span>
            <br></br>
            <select required className='select-type'
            onChange={(e) => setProfile({ ...profile, type: e.target.value })}
            name="category" default = "" id="category">
            <option className='options' value="manufacturer">Manufacturer</option>
            <option className='options' value="retailer">Retailer</option>
            <option className='options' value="distributor">Distributor</option>
            </select> 
            </div>
            <br></br>
            <div className='edit-row'>
            <span className='location-text'>Enter the Contact details:</span>
            <input
            type="text" className='location-text' width="100%"
            value={profile.contact}
            onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
          />          
            </div>
            <br></br>
            <div className='edit-row'>
            <span className='location-text'>Describe yourself:</span>
            <input
            type="text" className='location-text' width="100%"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />          
            </div>
            <br></br>
          <div className='row'>
          <button className='profile-edit' onClick={handleSaveClick}>Save</button>
          <button className='profile-edit' onClick={handleCancelClick}>Cancel</button>
          </div>
            </div>             
            </div>
            </>)}
        </div>
    </div>
      </div>
        
    )
};