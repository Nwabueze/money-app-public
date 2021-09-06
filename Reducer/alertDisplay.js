const alertDisplayReducer = (state = "none", action) => {
    switch(action.type){
        case 'HIDE_ALERT':
            return "none"
        case 'SHOW_ALERT':
            return "block"
        default:
            return state;
    }
}

export default alertDisplayReducer;