const pinReducer = (state = "", action) => {
    switch(action.type){
        case 'REMOVE_PIN':
            return ""
        case 'SET_PIN':
            return action.payload;
        default:
            return state;
    }
}

export default pinReducer;