const alertMessageReducer = (state = "", action) => {
    switch(action.type){
        case 'REMOVE_MESSAGE':
            return ""
        case 'SET_MESSAGE':
            return action.payload;
        default:
            return state;
    }
}

export default alertMessageReducer;