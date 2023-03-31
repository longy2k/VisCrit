// import {useRef} from 'react';
import emailjs from '@emailjs/browser';
import dataGetter from './DataGetterEmail';
// import dataGetter from './DataGetterEmail';
import * as XLSX from 'xlsx';
import HomeComponent from './DataGetterEmail';


// *****IGNORE THIS*********


const Email = () => {
   
   
    
    var templateParams = {
      
  
      };
      emailjs.send('service_aqh9jcs', 'template_o4fpfps', templateParams,'j0N__ewsQtx-xtUhQ')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
      

}
export default Email;





