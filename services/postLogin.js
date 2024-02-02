import AWS from 'aws-sdk'
import buildResponse from '../utils/util.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../utils/auth.js'

AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'madinax-users';

export default async function login(user) {
    
    console.log("userInfo is :")
    console.log(user)
    console.log(user.username)
    console.log(user.password)


    const username = user.username;
    const password = user.password;

    if(!user || !username || !password) {
        return buildResponse(401, {
            message: 'username and passward are required'
        })
    }

    const dynamoUser = await getUser(username);
    console.log('getUserResponse is :')
    console.log(dynamoUser)
    if (!dynamoUser && !dynamoUser.username) {
        return buildResponse(401, {
            message: 'user does not exist'
        })
    }

    if(!bcrypt.compareSync(password, dynamoUser.password)) {
        return buildResponse(403, {message: 'password is incorrect.'})
    }

    const userInfo = {
        username: dynamoUser.username,
        name: dynamoUser.name
    }
    
    const token = generateToken(userInfo)
    const response = {
        user: userInfo,
        token: token
    }

    return buildResponse(200, response)
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username : username
            } 
        
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.log('there is an error getting user:' , error)
    })
}
