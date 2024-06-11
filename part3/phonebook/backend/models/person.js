const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneValidator = {
  validator: function(v) {
    return /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
  },
  message: props => `${props.value} is not a valid phone number! It should be in the format XX-XXXXXXX or XXX-XXXXXXXX`
};

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    
    },
    number: {
      type: String,
      required: true,
      validate: phoneValidator,
    },
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', noteSchema)
