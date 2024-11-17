import { storageService } from '../async-storage.service.js';
import { utilService } from '../util.service.js';

const USER_STORAGE_KEY = 'users';

export const userService = {
    getUsers,
    getById,
    save,
    remove,
};

async function getUsers() {
    return storageService.query(USER_STORAGE_KEY);
}

async function getById(userId) {
    return storageService.get(USER_STORAGE_KEY, userId);
}

async function save(user) {
    if (user._id) {
        return storageService.put(USER_STORAGE_KEY, user);
    } else {
        user._id = utilService.makeId();
        return storageService.post(USER_STORAGE_KEY, user);
    }
}

async function remove(userId) {
    return storageService.remove(USER_STORAGE_KEY, userId);
}

