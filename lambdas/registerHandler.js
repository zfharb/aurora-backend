
import register from '../services/postRegister.js'

export const handler = async (event) => {

    const registerBody = JSON.parse(event.body);
    let response = register(registerBody)
    return response;
  };
  
  