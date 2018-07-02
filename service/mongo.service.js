var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/hyperLedger";

var dbCon;


let connect = () => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(url, function (err, dbInstance) {
            if (err) {
                return reject(new connectionError([err.name + " : " + err.message], {
                    message: `Connection to MongoDB at ${url}`
                }
                ))
            } else {
                dbCon = dbInstance;
                resolve(`Mongo connected at ${url}`);
            }
        })

    });
};


let insert = (data) => {
    return new Promise((resolve, reject) => {
        let collection = dbCon.collection('users');
        collection.insert(data, (err, result) => {
            if (err) return reject({ message: "DB Insert Failed" });
            return resolve({ message: "Data Inserted" });
        })
    })
};


let get = (query) => {
    return new Promise((resolve, reject) => {
        let collection = dbCon.collection('users');
        collection.find(query).toArray((err, result) => {
            if (err) return reject({ message: "DB query Failed" });
            return resolve(result);
        })
    })
}



module.exports = {
    connect,
    insert,
    get
}