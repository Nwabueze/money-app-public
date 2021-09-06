//import React from 'react';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useSelector, useDispatch } from 'react-redux';
import { 
  set_glogal14digit, 
  remove_global14digit, 
  open_simple_dialogue, 
  close_simple_dialogue, 
  set_message,
  set_alert,
  remove_alert  
} from '../Action'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function RecipientNumber() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
});


  const code14 = useSelector(state => state.codeReducer);

  const [code14digit, setCode14digit] = useState(code14);

  useEffect(() => {
    console.log(`14 digit code is now ${code14}`);
  },[code14digit]);
  
  const dispatch = useDispatch();

  const handleCode14digits = (code) => {
    if(!code || code.length < 14 || code.match(/\D+/) != null){
     
      dispatch(remove_global14digit(0))
      return;
    }

    dispatch(set_glogal14digit(Number(code)))
  }

  const handleChange = (prop) => (event) => {
    //setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    //setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    //event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div style={{"marginLeft":"auto", "marginRight": "auto", "marginTop":"30px", "width": "300px"}}>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
          <Input style={{"marginLeft":"auto", "marginRight": "auto"}}
            id="standard-adornment-amount"
            
            onChange={ (e) => { handleChange('amount'); handleCode14digits(e.target.value) } }
            placeholder="Recipient 14 digit code"
            startAdornment={<InputAdornment position="start">No.</InputAdornment>}
          />
        </FormControl>
      </div>
    </div>
  );
}
