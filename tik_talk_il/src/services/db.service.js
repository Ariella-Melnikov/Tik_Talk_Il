'use strict'

import { storageService } from '@/services/storage.service.js'
import { utilService } from '@/services/util.service.js'

export const dbService = {
    query,
    get,
    remove,
    post,
    put,
    insert,
}

const ID_FIELD = '_id'

async function query(collectionName) {
    var collection = storageService.load(collectionName)
    if (!collection) collection = []
    return Promise.resolve(collection)
}

async function get(collectionName, id) {
    var collection = await query(collectionName)
    return collection.find(curr => curr[ID_FIELD] === id)
}

async function remove(collectionName, id) {
    var collection = await query(collectionName)
    var idx = collection.findIndex(curr => curr[ID_FIELD] === id)
    if (idx === -1) throw new Error('something went wrong')
    collection.splice(idx, 1)

    storageService.save(collectionName, collection)
    return Promise.resolve()
}

async function post(collectionName, item) {
    var collection = await query(collectionName)

    item[ID_FIELD] = utilService.makeId()
    collection.push(item)

    storageService.save(collectionName, collection)
    return Promise.resolve(item)
}

async function put(collectionName, item) {
    var collection = await query(collectionName)

    let idx = collection.findIndex(curr => curr[ID_FIELD] === item[ID_FIELD])
    if (idx === -1) throw new Error('something went wrong')
    collection[idx] = item

    storageService.save(collectionName, collection)
    return Promise.resolve(item)
}

async function insert(collectionName, items) {
    var collection = await query(collectionName)
    items.forEach(curr => (curr[ID_FIELD] = utilService.makeId()))
    collection.push(...items)

    storageService.save(collectionName, collection)
    return Promise.resolve()
}