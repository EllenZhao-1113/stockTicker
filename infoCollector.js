const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || 3000;
const url = 'mongodb+srv://ellenzhao:chuggaa1113@cluster0.htvza.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(url, {useUnifiedTopology: true}) 
  .then(client=> {
    const db = client.db('stockticker');
    const collection = db.collection('companies');
    app.set('view engine', 'ejs');

    app.listen(port, function() {
      console.log('listening on 3000');
    })
    app.use(bodyParser.urlencoded({extended:true}));
    app.get('/', function(req, res) {
      res.sendFile('stockTicker.html');
    })
    app.post('/collect', (req, res) => {
      if(req.body.nameInput != "") {
        var query1 = {Company: req.body.nameInput};
        collection.find(query1).toArray()
          .then(results1 => {
            console.log(results1);
            res.render('stockTicker.ejs', {companies: results1});
          })
          .catch(error => console.error(error))
      }
      else if (req.body.tickInput != "") {
        var query2 = {Ticker: req.body.tickInput};
        collection.find(query2).toArray()
          .then(results2 => {
            console.log(results2);
            res.render('stockTicker.ejs', {companies: results2});
          })
          .catch(error => console.error(error))
        }
    })
    console.log("connected to database");
  })
  .catch(error=>console.error(error))

/*
app.listen(3000, function() {
  console.log('listening on 3000');
})

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res) {
  res.sendFile('/Users/ellenzhao/Documents/stockTicker.html');
})

app.post('/collect', (req, res) => {
  console.log(req.body);
})*/
