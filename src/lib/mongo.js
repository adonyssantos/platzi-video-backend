const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

console.log('ObjectId:', ObjectId);

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    new MongoClient(MONGO_URI, { userNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.MongoClient.connect(error => {
          if (error) {
            reject(error);
          }

          console.log('Connect successfully to mongo');
          resolve(this.client.dbHost(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }
}

module.exports = MongoLib;
