import React, {useState} from "react"
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import UserPage from "./userpage/UserPage";
import './assets/css/NavBar.css';

export default function NavBar() {
    return (
        <Router>
          <Routes>
              <Route exact path='/' element={< UserPage />}></Route>
          </Routes>
        </Router>
    )
}
