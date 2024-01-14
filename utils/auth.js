import jwt from 'jsonwebtoken';

export function generateToken(user) {
    if(!user) {
        return null;
    }


    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}


export function verifyToken(username, token) {
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if(error) {
            return {
                verified: false,
                message: 'invalid token'
            }
        }
        if(response.usernmae != username) {
            return {
                verified: false,
                message: 'invalid user'
            }
        }
        return {
            verified: true,
            message: 'vrified'
        }
    })
}