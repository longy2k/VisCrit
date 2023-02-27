import React from 'react';
import Header from "./components/Header"
import ReactDOM  from "react-dom"
import Footer from "./components/Footer"
import "./style.css"
import Home from './components/Home';

function Page() {
    return (
        <div>
        <Header/>
        <Footer />
        </div>
    )
}

ReactDOM.render(
    <Page />
    ,
    document.getElementById("root")
)
