import {useRef} from 'react';
import emailjs from '@emailjs/browser';


var styling = {
    div: {
        color: "blue",
        border: "1px solid blue"
    },
    input: {
        margin: "2px",
        padding: "5px"
        
    }
}



const Email = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_aqh9jcs', 'template_o4fpfps', form.current, 'j0N__ewsQtx-xtUhQ')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
      };
    

    return(
        <section>
            <div className='borde'>
                    
                
                <h2 className='cen'> Invite Student</h2>
                <form ref={form} onSubmit={sendEmail}>
                    
                    <input className='txtb1' placeholder='Student Name' name='user_name' required/> 
                    <input className='txtb1' type="email" placeholder='Student Email' name='user_email' required/> 
                    {/* <input type="text" placeholder='subject' name='subject' required />  */}
                    
                  
                    <textarea className='txtb' placeholder='Write Message to Student' name='message' cols= '30' rows='8'  />
                    
                    <button className='buttin'> Send Invite</button>
                     </form>
                     
            </div>
        </section>
    )
}
export default Email;





