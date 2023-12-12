const router = require('express').Router();
const { ObjectId } = require('mongodb');
const database = require('../db');

// to get all workouts
router.get('/', async (req, res) => {
    try {
        const db = req.db;
        const workouts = await db.collection('Workouts').find().toArray();
        res.json(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get single workout

router.get('/:_id', async (req, res) => {
    try {
        const { params } = req;

        const id  = params._id; // Access id directly from req.params
        const db = req.db;

        const workout = await db.collection('Workouts').findOne( { _id: new ObjectId(id) }); // Use findOne instead of find
        // console.log(workout)
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        const results = {
            id: workout._id,
            title: workout.title,
            sets: workout.sets,
            reps: workout.reps,
            total: workout.total,
            load: workout.load,
            group: workout.group,
            time: workout.timestamp
            // Add other properties you want to include in the response
        };

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// post a new workout
router.post('/', async (req, res) => {
    try {
        const { title, sets, reps, load, group } = req.body;
        const db = req.db;

        const timestamp = new Date();
        const total = sets * reps;
        const workout = {
            title,
            sets,
            reps,
            total,
            load,
            group,
            timestamp
        };

        const result = await db.collection('Workouts').insertOne(workout);
        // res.json({ message: 'Workout added successfully', workoutId: result.insertedId });
        res.status(200).json(workout)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE a workout (does not work)
router.delete('/:_id', async (req, res) => {
    try {
        const { params } = req;

        const id  = params._id;
        const db = req.db;

        const result = await db.collection('Workouts').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        // res.json({ message: `DELETE workout with ID: ${id}` });
        res.status(200).json({ _id: new ObjectId(id) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// UPDATE a workout (does not work needs to have logic)
router.patch('/:_id', async (req, res) => {
    try {
        const { params, body } = req;

        const id = params._id;
        const db = req.db;

        if(!ObjectId.isValid(id)){
            return res.status(400).json({error: "Invalid workoutID"})
        }

        const filter = {_id: new ObjectId(id)};

        const {title, load, sets, reps} = body;
        const timestamp = new Date();
        const total = sets * reps;

        const update = {
            $set:{
                title: title,
                load: load,
                sets: sets,
                reps: reps,
                total: total,
                timestamp: timestamp
            }
        }
        const result = await db.collection('Workouts').updateOne(filter, update)

        if( result.matchedCount === 0){
            return res.status(404).json({error:'Workout not found'});
        }

        // Implement logic to update a workout by ID
        // You can use db.collection('workouts').updateOne(...) or similar

        res.json(update);
        // res.json(workout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;