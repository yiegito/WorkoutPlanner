import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      }
    case 'DELETE_WORKOUT':
      return{
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    case 'PATCH_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map((w) =>
          w._id === action.payload._id ? action.payload : w
        )
      }
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: [],
    searchQuery: '',
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}
// COMMENT: We can use this instead of having a hooks foler with file
// export const useWorkoutsContext = () => {
//   return useContext(WorkoutsContext);
// };