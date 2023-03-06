import {useRef} from 'react';
import emailjs from '@emailjs/browser';



const Email = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_evl2uao', 'template_yr3sf48', form.current, 'unUrLE74I-gYimlTd')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
      };
    

    return(
        <section>
            <div className='email'>
                <h2 className='center'> Email Student</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <input type="text" placeholder='FUll Name' name='user_name' required/> 
                    <input type="email" placeholder='Email' name='user_email' required/> 
                    <input type="text" placeholder='subject' name='subject' required /> 
                    <textarea name='message' cols= '30' rows='8'  />
                    <button> Send Email</button>
                     </form>
            </div>
        </section>
    )
}
export default Email;