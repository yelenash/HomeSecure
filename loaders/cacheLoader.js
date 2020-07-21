import storage from 'node-persist'

export default async () => {
    await storage.init();
    return storage;
}
