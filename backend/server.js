const express = require('express')

// require in out database functionality
const mongo = require('./db')
// express app
const app = express()
const port = 4000

// middleware
app.use(express.json())

app.use((req, res, next) =>{
    req.db = mongo.getDb();
    next();
})

//routes
const workoutRoutes = require('./routes/workouts.js')
app.use('/workouts',workoutRoutes)

// listen for requests
app.listen(port, async () => {
    console.log('listening on port', port)
    await mongo.connect();
})

// npx nodemon server.js to run nodemon or npm run dev from scripts in package.json