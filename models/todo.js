const { application } = require("express")
const mongoose = require("mongoose")

const nestedObj = {
    field1: String
}

// defining the schema
const TodoSchema = new mongoose.Schema({
    record: {type: String, required: true},
    date: {type: Number, required: false, default: Date.now()},
    // obj: nestedObj
},
// {collection: 'my-todo'}overriding default behaviour of collection nomenclature
)



// TodoModel -> todomodel + 's' this is the defult behaviour
// to override this we can pass another argument in schema
const model = mongoose.model('TodoModel', TodoSchema)

module.exports = model
