import AWS from 'aws-sdk'
import buildResponse from '../utils/util.js'
import bcrypt from 'bcryptjs'

AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'aurora-users';

export default async function register(userInfo) {
    console.log(userInfo)
    const name = userInfo.name;
    const email = userInfo.email
    const username = userInfo.username
    const password = userInfo.password
    // let x = userInfo.body.replaceAll("\n","").replace("\\", "")
    if (!username || !email || !name || !password) {
        return buildResponse(401, {
            message: `${userInfo.body}required field are missing`
        })
    }

    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username) {
        return buildResponse(401, {
            message: 'user name already exist in database'
        })
    }


    const encryptedPassword = bcrypt.hashSync(password.trim(), 10)
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPassword
    }


    const saveUserResponse = await saveUser(user);
    if(!saveUserResponse) {
        return buildResponse(503, {message: 'server error'})
    }

    return buildResponse(200, {username: username})

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

async function saveUser(user) {
    const params = {
        TableName: userTable,
        Item: user
    }
    return await dynamodb.put(params).promise().then(() => {
        return true;
    }, error => {
        console.log('there is an error saving username:' , error)
    })
}

