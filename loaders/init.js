import cacheLoader from "./cacheLoader";
import UserStackApiService from '../services/apiServices/userStackApiService';


export default class Loaders{
    constructor() {

    }

    async init(){
        this.cache = await cacheLoader();
        this.devicesApi = new UserStackApiService();
    }

}
