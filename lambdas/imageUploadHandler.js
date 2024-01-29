import imageUpload from '../services/postImageUpload.js'

export const handler = async (event) => {
    const imageBody = JSON.parse(JSON.stringify(event.body));
    let response = imageUpload(imageBody)
    return response;

};