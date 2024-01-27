import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutsForm from "../components/WorkoutForm"
import SearchBar from "../components/SearchBar"
import { SelectBox } from "../components/SelectBox"
// import is from "date-fns/esm/locale/is/index.js"


const Home = () => {
  const { workouts, dispatch, searchQuery } = useWorkoutsContext()
  const [selectedGroup, setSelectedGroup] = useState('All Workouts');
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/workouts',{
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if(user){
      fetchWorkouts()
    }
  }, [dispatch, user])
    if (!workouts) {
      return null; // or return a loading indicator, error message, etc.
    }


    const filteredWorkouts = workouts.filter((workout) =>{
      const isMatchingGroup =
        selectedGroup === 'All Workouts' || workout.group === selectedGroup;

      const isMatchingName = 
        !searchQuery ||
        (workout.title && workout.title.toLowerCase().includes(searchQuery.toLowerCase()));

      return isMatchingGroup && isMatchingName;
    });

  return (
    <div className="home">
    <div className="workouts">
      <SearchBar />
      <SelectBox selectedGroup={selectedGroup} handleSelectChange={setSelectedGroup} />

      {filteredWorkouts.length === null || filteredWorkouts.length===0 ? (
        <p>No workouts found.</p>
      ) : (
        filteredWorkouts.map((workout) => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))
      )}
    </div>
    <WorkoutsForm />
  </div>
  )
}

export default Home