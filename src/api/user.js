import request from '@/utils/request'
import {
    encrypt
} from '@/utils/rsaEncrypt'


export function updatePass(user) {
    const data = {
        oldPass: encrypt(user.oldPass),
        newPass: encrypt(user.newPass)
    }
    return request({
        url: 'api/users/updatePass/',
        method: 'post',
        data
    })
}