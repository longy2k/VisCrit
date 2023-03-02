import React from "react"
import { useState } from 'react';

export default function RubricSection(){

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      alert(inputs);
    }

    return (
        <div className="rubricSection">
        <form onSubmit={handleSubmit}>
        <div>
            <label className="rubric-field"> Category 1
            <input
                type="text"
                name="category1"
                defaultValue={inputs.category || ""}
                onChange={handleChange}/>
            </label>
        </div>
          <br></br>
        <input type="submit" />
      </form>
    </div>
    )
}
