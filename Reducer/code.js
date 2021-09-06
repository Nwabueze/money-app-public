
const codeReducer = (state = "", action) => {
    switch(action.type){
        case 'REMOVE_14_DIGIT':
            return ""
        case 'SET_14_DIGIT':
            return action.payload
        default:
            return state;
    }
}

export default codeReducer;