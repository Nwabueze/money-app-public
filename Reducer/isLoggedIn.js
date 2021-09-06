//import axios from 'axios'

const isLoggedInReducer = (state = false, action) => {
    switch(action.type){
        case 'IS_LOGGED_IN':
            return true
        case 'IS_LOGGED_OUT':
            return false
        default:
            return state;

    }
}

export default isLoggedInReducer;