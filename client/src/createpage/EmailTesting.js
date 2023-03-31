import React, { useState } from "react";  
import { read, utils, writeFile } from 'xlsx';
import emailjs from '@emailjs/browser';

const EmailDatas = () => {
    // const [email, setEmail] = useState([]);

    

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[6]]);
                    // setEmail(rows)
                    reader.readAsArrayBuffer(file);

            // for (let index = 2; index < 4; index++) {
            //     // const Name = worksheet[`D${index}`].v;
            //     // const Email = worksheet[`C${index}`].v;
            //     const Name = rows[`D${index}`];
            //     const Email = rows[`C${index}`];
    
            //     var templateParams = {
            //         Name: Name,
            //         Email: Email
                
                
    
    
          
      
            //     };
            
            
            //     // console.log({
            //     //      Name: Name, Email: Email
            //     // })
            //     }
           
            // emailjs.send('service_aqh9jcs', 'template_o4fpfps', templateParams,'j0N__ewsQtx-xtUhQ')
            // .then(function(response) {
            //   console.log('SUCCESS!', response.status, response.text);
            // }, function(error) {
            //   console.log('FAILED...', error);
            // });
                }

                const rows = utils.sheet_to_json(wb.Sheets[sheets[6]]);
                 for (let index = 2; index < 4; index++) {
                // const Name = worksheet[`D${index}`].v;
                // const Email = worksheet[`C${index}`].v;
                const Name = rows[`D${index}`];
                const Email = rows[`C${index}`];
    
                var templateParams = {
                    Name: Name,
                    Email: Email
                
                
    
    
          
      
                };
            
            
                // console.log({
                //      Name: Name, Email: Email
                // })
                }
           
            emailjs.send('service_aqh9jcs', 'template_o4fpfps', templateParams,'j0N__ewsQtx-xtUhQ')
            .then(function(response) {
              console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
              console.log('FAILED...', error);
            });


            }
            reader.readAsArrayBuffer(file);
            

















        }
        // for (let index = 2; index < 4; index++) {
        //     const Name = worksheet[`D${index}`].v;
        //     const Email = worksheet[`C${index}`].v;
        //     const Name = rows[`D${index}`];
        //     const Email = rows[`C${index}`];

        //     var templateParams = {
        //         Name: Name,
        //         Email: Email
            
            


      
  
        //     };
        
        
        //     // console.log({
        //     //      Name: Name, Email: Email
        //     // })
        //     }
       
        // emailjs.send('service_aqh9jcs', 'template_o4fpfps', templateParams,'j0N__ewsQtx-xtUhQ')
        // .then(function(response) {
        //   console.log('SUCCESS!', response.status, response.text);
        // }, function(error) {
        //   console.log('FAILED...', error);
        // });

    }
    const sendEm = () =>{
        const wb = read();
        const sheets = wb.SheetNames;
        const rows = utils.sheet_to_json(wb.Sheets[sheets[6]]);
                 for (let index = 2; index < 4; index++) {
                // const Name = worksheet[`D${index}`].v;
                // const Email = worksheet[`C${index}`].v;
                const Name = rows[`D${index}`];
                const Email = rows[`C${index}`];
    
                var templateParams = {
                    Name: Name,
                    Email: Email
                
                
    
    
          
      
                };
            
            
                // console.log({
                //      Name: Name, Email: Email
                // })
                }
           
            emailjs.send('service_aqh9jcs', 'template_o4fpfps', templateParams,'j0N__ewsQtx-xtUhQ')
            .then(function(response) {
              console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
              console.log('FAILED...', error);
            });

    }
    return(
        <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
                                    <button onClick={sendEm}></button>
                                </div>
    )
}
export default EmailDatas