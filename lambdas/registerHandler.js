
import register from '../services/postRegister.js'

export const handler = async (event) => {
  console.log(event);
  console.log(event.body);
  const registerBody = JSON.parse(event.body);
  let response = register(registerBody)
  return response;
};
  
  