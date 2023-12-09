import { useState, useEffect } from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const EditWorkoutForm = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState('');

  // Set initial state when the workout prop changes
  useEffect(() => {
    setTitle(workout.title || '');
    setLoad(workout.load || '');
    setSets(workout.sets || '');
    setReps(workout.reps || '');
  }, [workout]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedWorkout = {
      title,
      load,
      sets,
      reps,
    };

    try {
      const response = await fetch(`/workouts/${workout._id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedWorkout),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setTitle('');
        setLoad('');
        setSets('');
        setReps('');
        setError(null);
        console.log('Workout updated successfully', json);
        dispatch({ type: 'PATCH_WORKOUT', payload: json });
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating workout:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className='edit-form'>
      <form className="Editform" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder={workout.title}
          />
        </label>
        <label>
          Load:
          <input
            type="text"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            placeholder={workout.load}
          />
        </label>
        <label>
          Reps:
          <input
            type="text"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            placeholder={workout.reps}
          />
        </label>
        <label>
          Sets:
          <input
            type="text"
            onChange={(e) => setSets(e.target.value)}
            value={sets}
            placeholder={workout.sets}
          />
        </label>
        <button>UPDATE</button>
      </form>
    </div>
  );
};

export default EditWorkoutForm;
