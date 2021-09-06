//import axios from 'axios'

const simpleDialogueReducer = (state = false, action) => {
    switch(action.type){
        case 'OPEN_SIMPLE_DIALOGUE':
            return true
        case 'CLOSE_SIMPLE_DIALOGUE':
            return false
        default:
            return state;

    }
}

export default simpleDialogueReducer;