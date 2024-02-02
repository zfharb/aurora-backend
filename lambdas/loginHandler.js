
import login from '../services/postLogin.js'

export const handler = async (event) => {
  console.log(event);
  console.log(event.body);
  const loginBody = JSON.parse(event.body)
  let response = login(loginBody)
    
  return response;
  };
  
  