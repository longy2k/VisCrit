import React from "react";





function Home(){
  const mystyle={
    color: "black",
    
    padding: "10px",
    fontFamily: "side"

  }
 


  return(
    <div class= "home">
      <h1 style={{
        display:"flex",
        justifyContent: "center",

      
      }}> Welcome to VisCrit</h1>
      <div style={
        {
          margin: '1px',
          border: '2px solid gray'
        }
      }></div>


    
    <div id="Borderor">
      
      <ul className="borl">
        
        
        <div style={{
          display: "flex",
          justifyContent: "center"
        }}> The Slide Critique site is for users to upload a slide, dashboard, and other related
            ideas to be critiqued. The users who upload the slide are able to send invites through
            e-mail to their recipients. This site makes getting feedback from a large group of people
            very easy. </div>
      </ul>
    </div>

   
    <div id="Bordero">
      <ul className="borr">
        
        <div style={{
          display: "flex",
          justifyContent: "center"
          
        }}> Instructions: </div>
       good instructions go here:
      </ul>
      
    </div>
    

    
    
   
    
  
    
    </div>
    
  );
}




 export default Home;


// function Home() {
//     return (
//         <div class= "home">
//     <h2> Welcome to VisCrit </h2>
    
    
//     <p> 
//     The Slide Critique site is for users to upload a slide, dashboard, and other related
//     ideas to be critiqued. The users who upload the slide are able to send invites through
//     e-mail to their recipients. This site makes getting feedback from a large group of people
//     very easy.
    
    
//     </p>
    
    
//     </div>
   
  
    

     
//     );
    


    
    
    
// }
// export default Home;

