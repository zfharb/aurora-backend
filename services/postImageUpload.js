import buildResponse from '../utils/util.js'
import * as fileType from 'file-type';
import { v4 as uuid } from 'uuid';
import getMimeType from '../utils/imageType.js'
import S3 from 'aws-sdk/clients/s3.js'; 

const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];


export default async function imageUpload(imageBody) {
    try {
        console.log(imageBody)
        let mime =  getMimeType(imageBody)
        console.log(mime)

        if (!imageBody || !mime) {
            return buildResponse(411, {
                message: 'incorrect body on request' 
            })
        }
        
        
        if (!allowedMimes.includes(mime)) {
            return buildResponse(412, {
                message: 'mime is not allowed ' 
            })           
        }
        
        
        const buffer = Buffer.from(imageBody, 'base64');
        console.log(buffer)
        const fileInfo = await fileType.fileTypeFromBuffer(buffer);
        console.log(fileInfo)
        const detectedExt = fileInfo.ext;
        const detectedMime = fileInfo.mime;

        console.log(buffer)
        console.log(fileInfo)
        console.log(detectedExt)
        console.log(detectedMime)

        if (detectedMime !== mime) {
            return buildResponse(413, {
                message: 'mime types dont match' 
            })    
        }
        
        const name = uuid();
        const key = `${name}.${detectedExt}`;
        
        console.log(`writing image to bucket called ${key}`);
        
        const s3 = new S3({
            region: process.env.region
        });
        await s3
        .putObject({
                Body: buffer,
                Key: key,
                ContentType: imageBody.mime,
                Bucket: process.env.pictureBucket,
                ACL: 'public-read',
            })
            .promise();

        const url = `https://${process.env.pictureBucket}.s3-${process.env.region}.amazonaws.com/${key}`;
        return buildResponse(200, {
            imageURL: url,
        })  
        
    } catch (error) {
        console.log('error', error);

        return buildResponse(414, {
            message: error.message || 'failed to upload image'  
        })    
    }
    
}

