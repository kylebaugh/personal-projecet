//IMPORTS
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

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
