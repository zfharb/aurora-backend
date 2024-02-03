
import login from '../services/postLogin.js'

export const handler = async (event) => {
  let loginBody;
  if (event.body !== null && event.body !== undefined) {
    console.log("event content is : --------->") 
    console.log(JSON.stringify(event));   
  if (event.isBase64Encoded){
    loginBody = JSON.parse(Buffer.from(event.body, 'base64').toString('utf8'));
  }
  } else { 
    loginBody = JSON.parse(event.body);
  } 

  console.log("login request body is : --------->") 
  console.log(JSON.stringify(loginBody)); 
    
  let response = login(loginBody) 
  return response;
  };
  
  