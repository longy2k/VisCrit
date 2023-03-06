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
                <li> <Link to="/CS410_northwestern/"><span id="logo">VisCrit</span></Link></li>
                <li> <Link to="/CS410_northwestern/">Home</Link></li>
                <li> <Link to="/CS410_northwestern/create">Create</Link></li>
                <li> <Link to="/CS410_northwestern/view">UserView</Link></li>
            </ul>
          </div>
          <Routes>
              <Route exact path='/CS410_northwestern/' element={< HomePage />}></Route>
              <Route exact path='/CS410_northwestern/create' element={< CreatePage />}></Route>
              <Route exact path='/CS410_northwestern/view' element={< UserPage />}></Route>
          </Routes>
        </Router>
    )
}
