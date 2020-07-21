import axios from 'axios';
import {userStackApiConfig} from '../../config/config.js'

export default class UserStackApi {
    constructor() {
        this.endpoint = userStackApiConfig.endpoint;
        this.apiKey = userStackApiConfig.apiKey;
    }

    async getItem(userAgent) {
        let query = {
            access_key: this.apiKey,
            ua: userAgent
        };
        return axios.get(`${this.endpoint}/detect`, {params: query}).catch(err => {
            throw (`Error in fetching ${userAgent} from UserdAtack API`)
        })
    }
}