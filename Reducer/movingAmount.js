const movingAmountReducer = (state = 0, action) => {
    switch(action.type){
        case 'REMOVE_SAME_APP_TRANSFER_AMOUNT':
            return 0
        case 'SET_SAME_APP_TRANSFER_AMOUNT':
            return action.payload;
        default:
            return state;
    }
}

export default movingAmountReducer;


