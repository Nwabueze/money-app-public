import React, { useState, useEffect } from 'react';
//import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import SendSteppers from './SendStepper';
import axios from 'axios';

import { Button, List, ListItem, ListItemText, TextField, FormControl, InputLabel, Input, InputAdornment, FormHelperText, NativeSelect } from '@material-ui/core';
import Cookie from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { 
  open_simple_dialogue, 
  close_simple_dialogue, 
  set_message, 
  set_pin, 
  remove_pin,
  set_alert,
  remove_alert, 
  set_balance
} from '../Action';
import autoAlert from '../utils/autoAlert';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabView() {
  const dispatch = useDispatch();
  const balance1 = useSelector(state => state.balanceReducer);
  const email1 = Cookie.get("email") || false;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 
  
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState(email1);
  const [pin, setPin] = useState("");
  const [code, setCode] = useState("");
  const [balance, setBalance] = useState(balance1);

  const [selectedIndex, setSelectedIndex] = useState(1);

  const [bank, setBank] = useState(false);
  const [accountnumber, setAccountnumber] = useState(false);
  const [transferamount, setTransferamount] = useState(false);

  const [credit, setCredit] = useState(0);
  
  
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");
  const [blurMessage, setBlurMessage] = useState("");
  const [blurDisplay, setBlurDisplay] = useState("none");
  
  
  

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };


   /* eslint-disable */
  useEffect(() => {
    
    let isMounted = true; 

    axios.get('/api/users?q='+ (JSON.stringify({ email: email, type: "find" })) ).then(res => {
      const jsn = res.data;
      if(jsn.found){
          setName(jsn.name);
          setPin(jsn.pin);
          setCode(jsn.code);
          dispatch(set_balance(jsn.balance));
          setBalance(jsn.balance);
      }
    });
    
    return () => { isMounted = false }; 
  }, []); 
  /* eslint-enable */
  
  
  // Handle transfers
  const handleBank = (text) => {
    if(!text){
      setBank(false);
      return false;
    }
    setBank(text);
    console.log(`Bank: ${bank}`);
  }

  const handleAccountNumber = (accnum) => {
    if(accnum.match(/\D+/) != null || accnum.length != 10){
      setAccountnumber(false);
      return false;
    }
    setAccountnumber(accnum);
    
  }

  const handletransferAmount = (amount) => {
    if(!amount){
      setTransferamount(false);
      return;
    }
    if(amount+"".match(/\D+/) != null){
      setTransferamount(false);
      return false;
    }
    setTransferamount(Number(amount));
  }

  const autoClose = () => {
    setTimeout(() => {
        setAlertDisplay("none");
    },10000);
    return true;
  };

  const doTransfer = () => {
     
      
    if(!bank){
      setAlertMessage("Please select beneficiary bank and retry");
      setAlertDisplay("block");
      autoClose();
      return;
    }
    
    if(!accountnumber){
      setAlertMessage("Invalid account number, please enter beneficiary account number and retry");
      setAlertDisplay("block");
      autoClose();
      return;
    }
    if(!transferamount){
      setAlertMessage("Invalid amount, please enter amount and retry");
      setAlertDisplay("block");
      autoClose();
      return;
    }

    const d = JSON.stringify(
      { email: email, type: "transfer", bank: bank, accountnumber: accountnumber, amount: transferamount }
    );

    setBlurMessage("Please wait while the transfer is in progress, this may take a few seconds");
    setBlurDisplay("block");
    axios.get('/api/users/?q='+d).then(res => {
      setBlurDisplay("none");
      const jsn = res.data;
      if(jsn.sent){
          setAlertMessage("Transfer was successful, balance is now $"+jsn.balance, "alert")
          setAlertDisplay("block");
          autoClose();
          dispatch(set_balance(jsn.balance));
          setBalance(jsn.balance);
      }
    }).finally(() => {
      setBlurDisplay("none");
    });
  }

  const handleMoney = (amount) => {
    if(!amount){
      return;
    }

    if(amount.match(/\D/) != null){
      return;
    }

    setCredit(Number(amount));
  }

  const addMoney = (money) => {
    
    if(!credit){
      setAlertMessage("Invalid amount, please specify the amount to be added");
      customAlert();
      return;
    }

    setBlurMessage("Please wait...");
    setBlurDisplay("block");
    const d = JSON.stringify({ type: "credit", email: email, amount: credit });
    axios.get('/api/users/?q='+d).then(res => {
      setBlurDisplay("none");
      const jsn = res.data;
      if(jsn.found){
          dispatch(set_balance(jsn.balance));
          setBalance(jsn.balance);
          setAlertMessage("$"+(credit)+" was successfully added to your account");
          customAlert();
      }else{
        setAlertMessage("Couldn't add money to your account, please try again later");
        customAlert();
      }
    });
  }

  const checkBalance = () => {
    const d = JSON.stringify({ type: "balance", email: email });
    axios.get('/api/users/?q='+d).then(res => {
      const jsn = res.data;
      if(jsn.found){
          dispatch(set_balance(jsn.balance));
          setBalance(jsn.balance);
          setAlertMessage("Available balance is $"+(jsn.balance));
          customAlert();
      }else{
        setAlertMessage("Couldn't check balance, please try agin later");
        customAlert();
      }
    });
  }

  
  const customAlert = () => {
    setAlertDisplay("block");
    setTimeout(() => {
      setAlertDisplay("none");
    }, 10000);
  };
  
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="custom tabs">
          <Tab label="Send Money" {...a11yProps(0)} />
          <Tab label="Transfer" {...a11yProps(1)} />
          <Tab label="Balance" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/** Here is where the sending of money happens */}
        <SendSteppers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ "marginTop": "150px" }}>
          <div style={{ "marginTop": "30px" }}>
            <Typography variant="body1">To proceed with transfer, enter recipient details below</Typography>
          </div>
          <div style={{ "marginTop": "30px" }}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-helper">Bank</InputLabel>
              <NativeSelect
                value={bank}
                onChange={(e) => { handleBank(e.target.value) }}
                inputProps={{
                  name: 'bank',
                  id: 'bank-native-helper',
                }}
              >
                <option aria-label="None" value="" />
                <option value={"zenith"}>Zenith</option>
                <option value="uba">UBA</option>
                <option value="access">Access</option>
                <option value="firstbank">FirstBank</option>
                <option value="unionbank">Union Bank</option>
              </NativeSelect>
              <FormHelperText>Select beneficiary bank</FormHelperText>
            </FormControl>
            
            <TextField required id="standard-disabled" label="Account Number" placeholder="Account Number" onChange={(e) => { handleAccountNumber(e.target.value) }} />
          </div>
          <div style={{ "marginTop": "30px" }}>
            <TextField required label="Amount" type="text" placeholder="Amount" onChange={(e) => { handletransferAmount(e.target.value) }} />
            <Button style={{ "marginTop": "30px" }} fullWidth variant="contained" color="primary" onClick={doTransfer}>
              do transfer
            </Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div style={{"marginTop": "30px"}}>
          {
            email ? '' :
            <Typography>
              <Alert severity="error">We could not fetch your data.  To perfom any transaction, please reload this page now</Alert>
            </Typography>
          }
         
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemText primary={"Code "+code} />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary={"PIN "+pin} />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary={"Balance $"+balance1} />
        </ListItem>
      </List>
          <div  style={{"marginBottom":"20px", "marginTop": "20px"}}>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">Add Money</InputLabel>
              <Input
                id="standard-adornment-amount"
                onChange={(e) => { handleMoney(e.target.value) }}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
            <Button style={{"marginTop": "30px"}} variant="contained" color="primary" onClick={addMoney}>Add Money</Button>
          </div>

          <div>
            <Typography style={{"marginBottom":"10px", "marginTop": "50px"}} variant="subtitle1">Check available balance</Typography>
            <Button style={{"marginTop": "0px"}} variant="contained" color="primary" onClick={checkBalance}>check balance</Button>
          </div>
      </div>
      </TabPanel>
      
      <div 
      style={{"display":alertDisplay,"position":"fixed","top":"200px","left":"calc(50vw - 100px)",
      "width":"200px","height":"100px","backgroundColor":"black","color":"#ffff","zIindex":100000000000,
      "padding":"15px","borderRadius":"10px","paddingTop":"25px","paddingBottom":"25px"
      }}>
        <Typography variant="caption">{alertMessage}</Typography>
      </div>
      <div 
      style={{"display":blurDisplay,"position":"fixed","top":"200px","left":"calc(50vw - 100px)",
      "width":"200px","height":"100px","backgroundColor":"#ffff","zIndex":10000000001,
      "padding":"15px","borderRadius":"10px","paddingTop":"25px","paddingBottom":"25px"
      }}>
        <Typography variant="caption">{blurMessage}</Typography>
      </div>
      <div 
      style={{"display":blurDisplay,"position":"fixed","top":"0px","left":"0px","width":"100vw",
      "height":"100vh","opacity":.5,"backgroundColor":"black","zIndex":1000000}}></div>
        
    </div>
  );
};

/*
TabView.getInitialProps = async ({ req }) => {
  
  const cookies = await parseCookies(req);
  const userEmail = await cookies.email || "no-email";
  await console.log("Email is now "+email);

  return { 
    props: { userEmail: true },
  };
}
*/
export default TabView;