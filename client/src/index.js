import React from 'react';
import Header from "./components/Header"
import ReactDOM  from "react-dom"
import Footer from "./components/Footer"
import "./style.css"

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
