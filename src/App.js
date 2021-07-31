// import logo from './logo.svg';
import {BrowserRouter as Router,Link, Route,Switch} from 'react-router-dom'
import Productbuy from './components/Productbuy';
import './App.css';

function App() {
  return (
      <Router>
          <div className="container">
              <Productbuy/>
          </div>
      </Router>
  );
}

export default App;
