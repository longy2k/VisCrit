import React, { useEffect, useState} from 'react'
import UploadSection from "./UploadSection"
import ImportSection from "./ImportSection"

import '../assets/css/CreatePage.css';
import dataGetter from './DataGetterEmail';
import Email from './Email';
import Datagetter from './DataGetterEmail';
import HomeComponent from './DataGetterEmail';
import EmailData from './DataGetterEmail';
import EmailDatas from './EmailTesting';

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
           
            <EmailDatas />
            
            
            
          </div>
        </div>
    )
}
