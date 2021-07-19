require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
var app = express()
 
app.use(cors())

const port = process.env.APP_PORT || 3005;
const { cat } = require('./mongo');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/',(req,res) => {
    res.send('This app is running properly')
});

app.get('/cat',async (req,res) => {
    try {
        const kitten = await cat.find({});
        res.status(200).send((kitten));
    
    } catch (error) {
        console.log(error)
    }
});

app.post('/cat',(req,res) => {
    const payload = req.body;
    const kitten = new cat(payload);
    kitten.save().then(() => {
        res.status(200).send('kitten added 🐈');
    });

})
app.listen(port,() =>
    console.log(`This app run on ${port}`)
)
