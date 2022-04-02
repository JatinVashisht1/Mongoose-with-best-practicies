const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const todoModel = require('./models/todo')
// mongoose <- wrapper (sort of) over mongodb
const mongoose = require('mongoose')


const app = express()
const port = 3000


// mongodb because it is having its own protocol
// we can remove 27017 if mongodb is already listening of default port

mongoose.connect('mongodb://localhost/firstmongo')


// start writing queries

// mongoose models can queue the requests you have

// here we are serving static files using express of asset folder
// right now it is working at js level
// we want to shift it to mongodb level
app.use('/', express.static(path.resolve(__dirname, 'assets')))

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json({ extended: true }))

app.post('/api/create', async (req, res) => {
  const record = req.body
  console.log(record)
  // accepts json object and creates entry in the database
  // this response is from MongoDB database server
  const response = await todoModel.create({ record: "My record" })
  console.log(response)
  res.json({ status: 'ok' })
})

app.get('/api/get', async (req, res) => {
  const records = await todoModel.find({}, function (err, result) {
    if (err) {
      res.send(err.message)
    }
    res.send(result);
  }).clone().catch((err) => { console.log(err) })
})

app.post('/api/modify', async (req, res) => {
  const oldTitle = req.body.oldTitle
  const newTitle = req.body.newTitle
  console.log(newTitle)
  console.log(oldTitle)
  const response = await todoModel.updateOne(
    {
      record: oldTitle
    },
    {
      $set: {
        record: newTitle
      }
    })
  console.log(response)
  res.send({ status: "Ok" })
}
)

app.post('/api/delete', async(req, res)=>{
  const record = req.body.title
  console.log(record, '/api/delete');

  const response = await todoModel.deleteOne({record})
  res.json({response: response})
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
