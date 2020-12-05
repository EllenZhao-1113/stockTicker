
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ellenzhao:chuggaa1113@cluster0.htvza.mongodb.net/?retryWrites=true&w=majority";

const csvFilePath = './companies-1.csv';
const csv=require('csvtojson'); 

csv() 
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        console.log(jsonObj);

        MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
            if(err) { return console.log(err); }
            
              var dbo = db.db("stockticker");
              var collection = dbo.collection('companies');
              collection.insertMany(jsonObj, (err, res)=>{
                if(err) throw err;
                console.log("number of documents inserted: " + res.insertedCount);
                db.close();
              });
        });
    })


 