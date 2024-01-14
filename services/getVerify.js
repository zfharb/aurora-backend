import buildResponse from '../utils/util'
import {verifyToken} from '../utils/auth'

export default async function verify(requesBody) {
    if(!requesBody.user || !requesBody.user.username || !requesBody.token) {
        return buildResponse(401, {
            verified: false,
            message: 'incorrect request body'
        })

    }

    const user = requesBody.user
    const token = requesBody.token
    const verification = verifyToken(user.username, token)
    if (!verification.verified) {
        return buildResponse(401, verification)
    }

    return buildResponse(200, {
        verified: true,
        message: 'success',
        user: user,
        token: token
    })

}