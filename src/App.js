import './App.css';
// import './output.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Content from './Components/Content';
import Header from './Components/Header';
import Trackgoods from './Components/Trackgoods';
import MapTrack from './Components/MapTrack';
import FindRetailers from './Components/FindRetailers';
import FindManufacturer from './Components/FindManufacturer';
import FindDistributors from './Components/FindDistributors';
import Signup from './Components/signup';
import Login from './Components/login';
import Profile from './Components/Profile';
import Notification from './Components/notification';
import PlaceOrder from './Components/PlaceOrder';

function App() {
  return (
    <BrowserRouter>
     <div className="App">
    <Routes>
      <Route path='/home' element={<Content />} />
      <Route path='/trackgoods' element={<Trackgoods />} />
      <Route path='/trackgoods/location' element={<MapTrack />} />
      <Route path='/retailers' element={<FindRetailers />} />
      <Route path='/manufacturers' element={<FindManufacturer />} />
      <Route path='/Distributors' element={<FindDistributors />} />
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/notifications' element={<Notification />} />
      <Route path='/placeorder' element={<PlaceOrder />} />
    </Routes>
    </div>
    </BrowserRouter>
   
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
