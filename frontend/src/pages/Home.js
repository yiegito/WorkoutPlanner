import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutsForm from "../components/WorkoutForm"
import SearchBar from "../components/SearchBar"
import { SelectBox } from "../components/SelectBox"


const Home = () => {
  const { workouts, dispatch, searchQuery } = useWorkoutsContext()
  const [selectedGroup, setSelectedGroup] = useState('All Workouts');

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/workouts')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    fetchWorkouts()
  }, [dispatch])
  const filteredWorkouts = searchQuery
  ? workouts.filter((workout) =>
      workout.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : selectedGroup !== 'All Workouts'
  ? workouts.filter((workout) => workout.group === selectedGroup)
  : workouts;


  return (
    <div className="home">
    <div className="workouts">
      <SearchBar />
      <SelectBox selectedGroup={selectedGroup} handleSelectChange={setSelectedGroup} />

      {filteredWorkouts === null || filteredWorkouts.length===0 ? (
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