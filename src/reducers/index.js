
let initialState = [];

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_STORE":
      initialState = action.payload
      return initialState
    case "ADD_RECORD": {
      return {
        ...state,
        payload
      }
    }
    case "GET_RECORD": {
      return {
      }
    }
    default:
      return state
  }
}

// Initialize the state with the data from the backend.
export default rootReducer;