import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Filter_search from './components/Show Data/FilterSearch';
import Home from './components/Show Data/Home';

function App() {
  return (
   <Router>
     <Navbar />
     <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/advanced" element={<Filter_search />}/>
     </Routes>
   </Router>
  );
}

export default App;
