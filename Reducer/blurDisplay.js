const blurDisplayReducer = (state = "none", action) => {
    switch(action.type){
        case 'HIDE_BLUR':
            return "none"
        case 'SHOW_BLUR':
            return "block"
        default:
            return state;
    }
}

export default blurDisplayReducer;