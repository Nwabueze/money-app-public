import alertMessageReducer from "./alertMessage";
import alertDisplayReducer from "./alertDisplay";
import balanceReducer from "./balance";
import blurDisplayReducer from "./blurDisplay";
import blurMessageReducer from "./blurMessage";
import codeReducer from "./code";
import isLoggedInReducer from "./isLoggedIn";
import movingAmountReducer from "./movingAmount";
import pinReducer from "./pin";
import simpleDialogueReducer from "./simpleDialogue";
import { combineReducers } from "redux";

const allReducer = combineReducers({
    alertMessageReducer,
    alertDisplayReducer,
    balanceReducer,
    blurDisplayReducer,
    blurMessageReducer,
    codeReducer,
    isLoggedInReducer,
    movingAmountReducer,
    pinReducer,
    simpleDialogueReducer
});

export default allReducer;
