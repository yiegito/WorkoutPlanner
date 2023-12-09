import { useState } from 'react';
import { useWorkoutsContext} from '../hooks/useWorkoutsContext'
import EditWorkoutForm from "./EditWorkoutForm"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const WorkoutDetails = ({ workout }) =>{
    const { dispatch } = useWorkoutsContext()
    const [showEditForm, setShowEditForm] = useState(false);

    const handleSubmit = async () =>{
        const response = await fetch('/workouts/' + workout._id,{
            method:'PATCH'
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:'PATCH_WORKOUT', payload: json})
        }
    };

    const handleClick = async () =>{
        const response = await fetch('/workouts/' + workout._id,{
            method: 'DELETE'
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:'DELETE_WORKOUT', payload: json})
        }
    }
    
    const handleEditClick = () => {
        // Toggle the state to show/hide the edit form
        setShowEditForm(!showEditForm);
    };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Group:</strong> {workout.group}</p>
      <p><strong>Load (lbs): </strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p><strong>Sets:</strong> {workout.sets}</p>
      <p><strong>Total:</strong> {workout.total}</p>
      <p><strong>Time Stamp: </strong>{formatDistanceToNow(new Date(workout.timestamp), {addSuffix:true})}</p>
      <span className= 'material-symbols-outlined' onClick={ handleClick}>Delete</span>
      <span className='edit' onClick={handleEditClick}>Edit</span>

      {/* Conditionally render the edit form */}
      {showEditForm && <EditWorkoutForm workout={workout} onSubmit={handleSubmit} />}
    </div>
  );
}

export default WorkoutDetails