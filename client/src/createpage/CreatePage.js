import React, { useEffect, useState} from 'react'
import UploadSection from "./UploadSection"
import ImportSection from "./ImportSection"

import '../assets/css/CreatePage.css';
import Email from './Email';

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
            <h1>Create or Import Rubric</h1>
            <h2>Upload Media</h2>
            <UploadSection />
            <h2>Customize Rubric</h2>
            <ImportSection />
            {/*<Email />*/}
          </div>
        </div>
    )
}
