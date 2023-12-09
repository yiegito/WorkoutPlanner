import {useState} from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutsForm = () =>{
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [group, setGroup] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const workout = {title,load,sets,reps, group}

        const response = await fetch('/workouts',{
            method:'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json'
            }

        })
        const json = await response.json();

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setSets('')
            setReps('')
            setGroup('')
            setError(null)
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                required
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Load:</label>
            <input
                required
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Sets:</label>
            <input
                required
                type="number"
                onChange={(e) => setSets(e.target.value)}
                value={sets}
            />
            <label>Reps:</label>
            <input
                required
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <label>Muscle Group: </label>
            <select id="groupSelect" value={group} required onChange={(e)=> setGroup(e.target.value)}>
                <option value="">Select</option>
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Biceps">Biceps</option>
                <option value="Triceps">Triceps</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Legs">Legs</option>
            </select>
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutsForm;