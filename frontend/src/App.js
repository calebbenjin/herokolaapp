import './App.css'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/signup';
import Preview from './pages/preview';
import Landing from './pages/Landing';
import Login from './pages/admin/index';
import Upload from './pages/admin/upload';
import Dashboard from './pages/admin/dashboard';
import Daalu from './pages/Daalu';
import AnalyticsEventTracker from './components/AnalyticsEventTracker'
import ReactGA from 'react-ga'





const TRACKING_ID = "UA-12341234-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <>
      
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/admin' element={<Login />} />
        <Route exact path='/admin/upload' element={<Upload />} />
        <Route exact path='/admin/dashboard' element={<Dashboard />} />
        <Route exact path='/pages/daalu' element={<Daalu />} />
        <Route exact path='/pages/signup/:id' element={<Signup />} />
        <Route exact path='/pages/preview/:id' element={<Preview />} />
      </Routes>  
    </>
  )
}

export default App
