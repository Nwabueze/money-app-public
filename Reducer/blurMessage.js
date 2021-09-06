const blurMessageReducer = (state = "", action) => {
    switch(action.type){
        case 'REMOVE_BLUR_MESSAGE':
            return ""
        case 'SET_BLUR_MESSAGE':
            return action.payload;
        default:
            return state;
    }
}

export default blurMessageReducer;