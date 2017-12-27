const { MongoClient, ObjectID } = require('mongodb');

const URI = 'mongodb://admin:1@ds163656.mlab.com:63656/hicket'

const getCollection = (URI) => {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(URI, (err, client) => {
            if (!err) {
                const db = client.db('hicket');
                resolve(db.collection('tickets'))
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    tickets: () => {
        return new Promise( (resolve, reject) => {
            getCollection(URI).then( (coll) => {
                coll.find({}).toArray((err, docs) => {
                    if(!err) {
                        resolve(docs)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    },
    ticket: (objectId) => {
        return new Promise( (resolve, reject) => {
            getCollection(URI).then( (coll) => {
                coll.findOne({_id: ObjectID.createFromHexString(objectId)}, (err, doc) => {
                    if(!err) {
                        resolve(doc)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    },
    add: (text) => {
        return new Promise( (resolve, reject) => {
            getCollection(URI).then( (coll) => {
                coll.insertOne({text: text}, (err, result) => {
                    if(!err) {
                        resolve({_id: result.insertedId, text: text})
                    } else {
                        reject(err)
                    }
                })
            })
        })
    }
}