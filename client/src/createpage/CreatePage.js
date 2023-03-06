import React, { useEffect, useState} from 'react'
import UploadSection from "./UploadSection"
import ImportSection from "./ImportSection"

import '../assets/css/CreatePage.css';

export default function CreatePage(){

    // const [backendData, setBackendData] = useState([{}])
    //
    // useEffect(() => {
    //   fetch("/api").then(
    //     response => response.json()
    //   ).then(
    //     data => {
    //       setBackendData(data)
    //     }
    //   )
    // }, [])


    return (
        <div className="createPage">
          <div className="center">
            <h1>Create</h1>
            <UploadSection />
            <h3>Customize Rubric</h3>
            <ImportSection />
          </div>
        </div>
    )
}
