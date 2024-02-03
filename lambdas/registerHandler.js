
import register from '../services/postRegister.js'

export const handler = async (event) => {
  let registerBody;
  if (event.body !== null && event.body !== undefined) {
    console.log("event content is : --------->") 
    console.log(JSON.stringify(event));   
  if (event.isBase64Encoded){
    registerBody = JSON.parse(Buffer.from(event.body, 'base64').toString('utf8'));
  }
  } else { 
    registerBody = JSON.parse(event.body);
  } 
  console.log("request body is : --------->") 
  console.log(JSON.stringify(registerBody)); 
    

  let response = register(registerBody)
  return response;
};
  
  