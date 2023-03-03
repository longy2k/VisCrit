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

        <div>
            <label> Category 2
            <input 
                type="text" 
                name="category2" 
                defaultValue={inputs.category || ""} 
                onChange={handleChange}/>
            </label>
        </div>

        <div className="rubric-field">
            <label>Category 3
            <input 
                type="text" 
                name="category3"
                defaultValue={inputs.category || ""} 
                onChange={handleChange}
            />
            </label>
        </div>
          
        <div className="rubric-field">
            <label>Category 4
            <input 
                type="text" 
                name="category4" 
                defaultValue={inputs.category || ""} 
                onChange={handleChange}/>
            </label>
        </div>

        <div className="rubric-field">
            <label>Category 5
            <input 
                type="text" 
                name="category5" 
                defaultValue={inputs.category || ""} 
                onChange={handleChange}/>
          </label>
        </div>

        <div className="rubric-field">
            <label>Category 6
            <input 
                type="text" 
                name="category6" 
                defaultValue={inputs.category || ""} 
                onChange={handleChange}/>
          </label>
        </div>

        <div className="rubric-field">
            <label> Category 7
            <input 
                type="text" 
                name="category7" 
                defaultValue={inputs.category || ""} 
                onChange={handleChange}/>
          </label>
        </div>

        <label> Category 8
            <input 
                type="text" 
                name="category8" 
                defaultValue={inputs.category || ""} 
                onChange={handleChange}/>
        </label>
          <br></br>
        <input type="submit" />
      </form>
    </div>
    )
}