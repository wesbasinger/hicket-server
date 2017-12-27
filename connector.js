const { MongoClient, ObjectID } = require('mongodb');

const URI = 'mongodb://admin:1@ds163656.mlab.com:63656/hicket'

const getClient = (URI) => {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(URI, (err, client) => {
            if(!err) {
                resolve(client);
            } else {
                reject(err)
            }
        })
    })
}

const getCollection = (client, dbName, collectionName) => {
    return new Promise( (resolve, reject) => {
        const db = client.db(dbName);
        const coll = db.collection(collectionName);
        if (coll) {
            resolve(coll)
        } else {
            reject("Error")
        }
    })
}

module.exports = {
    tickets: () => {
        return new Promise( (resolve, reject) => {
            getClient(URI).then( (client) => {
                getCollection(client, 'hicket', 'tickets').then( (coll) => {
                    coll.find({}).toArray( (err, docs) => {
                        if(!err) {
                            resolve(docs)
                        } else {
                            reject(err)
                        }
                    })
                })
            })
        })
    },
    ticket: (objectId) => {
        return new Promise( (resolve, reject) => {
            getClient(URI).then( (client) => {
                getCollection(client, 'hicket', 'tickets').then( (coll) => {
                    coll.findOne({_id: ObjectID.createFromHexString(objectId)}, (err, doc) => {
                        if (!err) {
                            resolve(doc)
                        } else {
                            reject(err)
                        }
                    })
                })
            })
        })
    }
    
}