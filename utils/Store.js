import Cookies from "js-cookie";
import { createContext, useReducer } from "react";


export const Store = createContext();

const initialState = {
    darkMode: Cookies.get('loggedIn' === 'TRUE' ? true : false),
}

function reducer(state, action){
    switch(action.type){
        case "LOGGED_IN":
          return {...state, loggedIn: true};
          case "LOGGED_OUT":
          return {...state, loggedIn: false};
        default:
            return state;
    }
}

export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
