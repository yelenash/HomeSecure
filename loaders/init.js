import cacheLoader from "./cacheLoader";

export default class Loaders{
    constructor() {

    }

    async init(){
        this.cache = await cacheLoader();
    }

}
