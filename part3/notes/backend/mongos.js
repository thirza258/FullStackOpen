const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb://thirzahmad:${password}@ac-tzfthzq-shard-00-00.jhdln3j.mongodb.net:27017,ac-tzfthzq-shard-00-01.jhdln3j.mongodb.net:27017,ac-tzfthzq-shard-00-02.jhdln3j.mongodb.net:27017/?ssl=true&replicaSet=atlas-psylxv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery',false)

mongoose 
 .connect(url)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

// mongoose.connection.close()
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})