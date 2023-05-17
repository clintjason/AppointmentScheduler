
const initialState = []

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_STORE":
      return action.payload
    case "ADD_RECORD": {
      return {
        ...state,
      }
    }
    default:
      return state
  }
}

// Initialize the state with the data from the backend.
export default rootReducer;