export default class DeviceDataService {
    constructor(cache, apiService) {
        this.cache = cache;
        this.apiService = apiService;
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
