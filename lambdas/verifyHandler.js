
import buildResponse from '../utils/util.js'

export const handler = async (event) => {
  let body= {
            message: "Go Serverless v3.0! Your function executed successfully!",
            input: event,
          };
    let response = await buildResponse(201, body);
    return response;

  };
  
  