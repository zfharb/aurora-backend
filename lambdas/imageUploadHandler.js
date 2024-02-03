import imageUpload from '../services/postImageUpload.js'

export const handler = async (event) => {
    console.log('event---------------')
    console.log(event)
    console.log('event---------------')

    const imageBody = JSON.parse(JSON.stringify(event.body));
    let response = imageUpload(imageBody)
    return response;

};