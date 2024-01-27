require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// require in out database functionality
const mongo = require('./db')
// express app
const app = express()
const port = process.env.PORT

// middleware
app.use(express.json())

app.use((req, res, next) =>{
    req.db = mongo.getDb();
    next();
})

//routes
const workoutRoutes = require('./routes/workouts.js')
app.use('/workouts',workoutRoutes)

const userRoutes= require('./routes/user.js')
app.use('/user', userRoutes)

// listen for requests
mongoose.connect(process.env.URL)
    .then(()=>{
        app.listen(port, async () => {
            console.log('connected to db\nlistening on port', port)
            await mongo.connect()
            
        })
    })
    .catch((error) =>{
        console.log(error)
    })


// npx nodemon server.js to run nodemon or npm run dev from scripts in package.json