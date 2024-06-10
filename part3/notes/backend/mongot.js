
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://thirzahmad:ishowspeed@ac-tzfthzq-shard-00-00.jhdln3j.mongodb.net:27017,ac-tzfthzq-shard-00-01.jhdln3j.mongodb.net:27017,ac-tzfthzq-shard-00-02.jhdln3j.mongodb.net:27017/?ssl=true&replicaSet=atlas-psylxv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
MongoClient.connect(uri, function(err, client) {
  const collection = client.db("test").collection("devices");
  console.log("Connected to MongoDB!");
  // perform actions on the collection object
  client.close();
});
