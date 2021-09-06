import React, {useEffect, useState} from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

export const AlertBox = () => {
    const [a, setA] = useState("");
    useEffect(() =>{

    }, [a]);
    
    const display = useSelector(state => state.alertDisplayReducer);
    const message = useSelector(state => state.alertMessageReducer);
    return (
        <div 
            style={{"display":display,"position":"fixed","top":"200px","left":"calc(50vw - 100px)",
            "width":"200px","height":"100px","backgroundColor":"black","color":"#ffff","zIndex":100000000000,
            "padding":"15px","borderRadius":"10px","paddingTop":"25px","paddingBottom":"25px"
            }}>
           <Typography variant="caption">{message}</Typography>
      </div>
    )
}