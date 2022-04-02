# Mongo Tut

## Hierarchy
- Database
    - Collection(s)
        - Document(s)
            - BSON (key value pairs)

## Some points about mongodb
- if you try to access a collectin that doesnot exists then mongodb will create one for you automatically
- MongoDB and our node app both are processes running 
- To make `**Node**` app and `**MongoDB**` communicate we have `**Sockets**` (it will be a TCP socket)
- in case of sockets you don't have to locate that on same machines
    - you can run mongodb on a cloud 
    - and node on localhost and you can still connect to the mongodb instance


## Mongoose
- it sits on top of mongodb native driver (mongodb)
- provides richer DX (developer experience)

```
// so we can also use it directly like this
// just make sure it is populated before accessing it
// rest is just fine
// but we generally use exported syntax to prevent some basic errors
console.log('todo from mongoose => ', mongoose.model('TodoModel'))
console.log('todo model require => ', todoModel)

console.log('exported model and mongoose model comparison => ', todoModel===mongoose.model('TodoModel')) // both objs are pointing to same object in the memory as well
```

## Create in CRUD (Mongoose)
```
// accepts json object and creates entry in the database
console.log('todo model require => ', todoModel)
```

## Read in CRUD (Mongoose)
```
// TODO: explore by your own also about these methods
app.get('/api/get', async (req, res) => {
  const records = await todoModel.find({  }, function(err, result) {
    if(err){
      res.send(err.message)
    }
    res.send(result);
  }).clone().catch((err)=>{console.log(err)})
})
```

## Update in CRUD (Mongoose)
```
const response = await todoModel.updateOne(
    {
      record: oldTitle
    },
    {
      $set: {
        record: newTitle
      }
    })
```
## Delete in CRUD (Mongoose)
```
app.post('/api/delete', async(req, res)=>{
  const record = req.body.title
  console.log(record, '/api/delete');

  const response = await todoModel.deleteOne({record})
  res.json({response: response})
})
```