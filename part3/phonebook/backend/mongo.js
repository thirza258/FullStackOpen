const mongoose = require('mongoose')

const password = process.argv[2]
let nameUser = ''
let numberUser = ''

const url =
  `mongodb://thirzahmad:${password}@ac-tzfthzq-shard-00-00.jhdln3j.mongodb.net:27017,ac-tzfthzq-shard-00-01.jhdln3j.mongodb.net:27017,ac-tzfthzq-shard-00-02.jhdln3j.mongodb.net:27017/?ssl=true&replicaSet=atlas-psylxv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length == 3) {
    Person.find({})
    .then(result => {
        console.log('phonebook:');
        result.forEach(person => {
        console.log(person.name, person.number);
        });
        return mongoose.connection.close();
    })
    .then(() => {
        console.log('Connection closed');
    })
    .catch(err => {
        console.error(err);
    });
    
}

const person = new Person({
    name: nameUser,
    number: numberUser,
})

person.save().then(result => {
    console.log(`added ${nameUser} number ${numberUser} to phonebook`)
    mongoose.connection.close()
})

