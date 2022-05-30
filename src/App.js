import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';

function App() {
  return (
   <Router>
     <Navbar />
     <Routes>
       <Route path="/" element={<LandingPage />}/>
     </Routes>
   </Router>
  );
}

export default App;
