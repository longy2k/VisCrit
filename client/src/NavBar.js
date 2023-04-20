import React from "react"
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import CreatePage from "./createpage/CreatePage";
import HomePage from "./HomePage";
import UserPage from "./userpage/UserPage";
import './assets/css/NavBar.css';

export default function NavBar() {
    return (
        <Router>
          <div className="navBar">
            <ul>
                <li><Link to="/"><span id="logo">VisCrit</span></Link></li>
                <li><button>Upload</button></li>
                {/* <li> <Link to="create/">Create</Link></li>
                <li> <Link to="/view/">UserPage</Link></li> */}
            </ul>
          </div>
          <Routes>
              <Route exact path='/' element={< UserPage />}></Route>
              <Route exact path='/create/' element={< CreatePage />}></Route>
              <Route exact path='/view/' element={< UserPage />}></Route>
          </Routes>
        </Router>
    )
}
