
import login from '../services/postLogin.js'

export const handler = async (event) => {
    const loginBody = JSON.parse(event.body)
    let response = login(loginBody)
    
    return response;
  };
  
  