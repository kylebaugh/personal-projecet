//IMPORTS
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const aws = require('aws-sdk');
const path = require('path')

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

//CONTROLLERS
const authCtrl = require('./controllers/authController')
const glossaryCtrl = require('./controllers/glossaryController')
const unitCtrl = require('./controllers/unitController')


//APP INSTANCE CREATED
const app = express()


//TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

//DATABASE CONNECTION
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log('Database Connected')
    app.listen(SERVER_PORT, () => {console.log(`Server connected on port ${SERVER_PORT}.`)})
})
.catch((err) => {console.log(err)})

//ENDPOINTS

//Auth

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.put(`/profile/changePic`, authCtrl.changePicture)


//Glossary

app.get('/glossary/getAllUnits', glossaryCtrl.getAllUnits)
app.get('/glossary/:unit_id', glossaryCtrl.getUnit)
app.get('/topics/:unit_id', glossaryCtrl.getTopic)
app.get('/topics/topicUnit', glossaryCtrl.topicUnit)
app.get('/topics/userItems/:user_id', glossaryCtrl.userItems)
app.get('/topics/learnList/:user_id', glossaryCtrl.learnList)
app.post('/topics/learnList/:glossary_id', glossaryCtrl.addPrint)
app.delete('/topics/learnList/:glossary_id', glossaryCtrl.removePrint)

//Unit

app.post('/unit/addItem', unitCtrl.addItem)
app.delete('/unit/deleteItem/:glossary_id', unitCtrl.deleteItem)
app.put('/unit/editItem/:glossary_id', unitCtrl.editItem)




//S3

app.get('/api/signs3', (req, res) => {

  aws.config = {
    region: 'ca-central-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      console.log('index s3 get signed failed')
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});

// Server

app.use(express.static(__dirname + '/../build'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})