import {createStore} from 'redux/store';


const initialState = { age: 21}

const myReducer = (state = initialState, action) => {

}

const store = createStore(myReducer);
