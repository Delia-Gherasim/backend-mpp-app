const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://gherasimdelia12:3-uCXZ6wz_ZXWGM@cluster0.tsn9oz7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = client;
