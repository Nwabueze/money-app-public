export const set_glogal14digit = (n) => {
    return {
        type: "SET_14_DIGIT",
        payload: n
    };
};

export const remove_global14digit = (n = "") => {
    return {
        type: "REMOVE_14_DIGIT"
    }
}

export const set_pin = (n) => {
    return {
        type: "SET_PIN",
        payload: n
    };
};

export const remove_pin = (n = "") => {
    return {
        type: "REMOVE_PIN"
    };
};

// SATA => SAME_APP_TRANSFER_AMOUNT
export const set_same_app_transfer_amount = (n) => {
    return {
        type: "SET_SAME_APP_TRANSFER_AMOUNT",
        payload: n
    };
};


export const remove_same_app_transfer_amount = (n = "") => {
    return {
        type: "REMOVE_SAME_APP_TRANSFER_AMOUNT"
    };
};

export const is_logged_in = () => {
    return {
        type: "IS_LOGGED_IN"
    };
};

export const is_logged_out = () => {
    return {
        type: "IS_LOGGED_OUT"
    };
};


export const set_message = (m) => {
    return {
        type: "SET_MESSAGE",
        payload: m
    };
};

export const remove_message = (m = "") => {
    return {
        type: "REMOVE_MESSAGE"
    };
};

export const set_alert = () => {
    return {
        type: "SHOW_ALERT",
    };
};

export const remove_alert = () => {
    return {
        type: "HIDE_ALERT"
    };
};

export const open_simple_dialogue = () => {
    return {
        type: "OPEN_SIMPLE_DIALOGUE"
    };
};

export const close_simple_dialogue = () => {
    return {
        type: "CLOSE_SIMPLE_DIALOGUE"
    };
};

/**
 * 
 * @param {number: the new balance} n 
 * @returns Object
 */
export const set_balance = (n) => {
    return {
        type: "SET_BALANCE",
        payload: n
    }
}







