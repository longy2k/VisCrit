import React, { useEffect, useState} from 'react'
import UploadSection from "./UploadSection"
import RubricSection from "./RubricSection"
import ImportSection from "./ImportSection"

export default function CreatePage(){

    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
      fetch("/api").then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    }, [])


    return (
        <div className="CreatePage">
          <div className="createCenter">
            <h1>Create</h1>
            <UploadSection />
            <ImportSection />
            <RubricSection />
          </div>
        </div>
    )
}
