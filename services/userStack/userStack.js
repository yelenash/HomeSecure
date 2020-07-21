import UserStackApi from './userStackApi';

export default class UserStack {
    constructor(cache) {
        this.cache = cache;
        this.apiService = new UserStackApi();
    }

    async getUaDeviceData(userAgent) {
        let result = await this.cache.getItem(userAgent);
        if (!result) {
            let response = await this.apiService.getItem(userAgent)
            result = response.data.device;
            await this.cache.setItem(userAgent, result);
        }
        return result;
    }
}
