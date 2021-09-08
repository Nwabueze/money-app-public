//import React from 'react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import cookie from 'js-cookie';
import axios from 'axios';
///import useStyles from '../utils/styles';
//import { Typography } from '@material-ui/core';
//import { checkEmail, checkPassword, checkText } from '../utils/Checker';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            marginTop: "20px",
        },
    },
    ml_30: {
        marginLeft: "30px"
    },
    mtop: {
        marginTop: "15px",
    },
    info: {
        color: "royalblue",
        marginTop: "30px",
    },
    appName: {
        fontSize: "27px",
    },
    header: {
        marginTop: "15px",
        marginBottom: "15px"
    },
}));




export default function Register() {

    const classes = useStyles();
    const router = useRouter()

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [warning, setWarning] = useState("Please enter valid inputs only");
    const [warn, setWarn] = useState("none");
    const [alert, setAlert] = useState("none");
    //const [border, setBorder] = useState("");

    const [blurDisplay, setBlurDisplay] = useState("none");
    const [blurMessage, setBlurMessage] = useState("");

    const [alertMessage, setAlertMessage] = useState("");
    const [alertDisplay, setAlertDisplay] = useState("none");
    const [warnSeverity, setWarnSeverity] = useState("success");

    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    



    useEffect(() => {
        //cookie.set("email", email);
    }, [email]);


    let checkFirstName = (text) => {
        const word = "Please enter a valid first name";
        if (!text) {
            setAlert("block");
            setWarn(word);
            setFirstname("");
            setFirstnameError(true);
            return false;
        }

        if (text.length < 2) {

            setAlert("block");
            setWarn(word);
            setFirstname("");
            setFirstnameError(true);
            return false;
        }

        // Everything ok
        setAlert("none");
        setFirstname(text);
        setFirstnameError(false);
        if(firstname && lastname && email && password) {
            setWarnSeverity("success");
        }
        return true;
    }

    let checkLastName = (text) => {
        const word = "Enter a valid last name";
        if (!text) {
            setAlert("block");
            setWarning(word);
            setWarn("block");
            setLastname("");
            setLastnameError(true);
            return false;
        }

        if (text.length < 2) {
            setAlert("block");
            setWarn(word);
            setLastname("");
            setLastnameError(true);
            return false;
        }

        // Everything ok
        setAlert("none");
        setLastname(text);
        setLastnameError(false);
        if(firstname && lastname && email && password) {
            setWarnSeverity("success");
        }
        return true;
    }

    let checkEmail = (email) => {
        const word = "Enter a valid email address";
        if (!email) {
            setAlert("block");
            setWarn(word);
            setEmail("");
            setEmailError(true);
            return false;
        }
        var isEmail = email.match(/(\w+)(@)(\w+)(\.)(\w+)/) != null;
        if (!isEmail) {
            setAlert("block");
            setWarn(word);
            setEmail("");
            setEmailError(true);
            return false;
        }

        // Everything ok
        setAlert("none");
        setEmail(email);
        setEmailError(false);
        if(firstname && lastname && email && password) {
            setWarnSeverity("success");
        }
        return true;
    }

    let checkPassword = (passw) => {
       
        const word = "Password needs to be up to 6 characters long";
        if (!passw) {
            setAlert("block");
            setWarn(word);
            setPassword("");
            setPasswordError(true);
            return false;
        }

        if (passw.length < 4) {
            setAlert("block");
            setWarn(word);
            setPassword("");
            setPasswordError(true);
            return false;
        }

        // Everything ok
        setAlert("none");
        setWarn(word);
        setPassword(passw);
        setPasswordError(false);
        if(firstname && lastname && email && password) {
            setWarnSeverity("success");
        }
        return true;
        
    }

    const handler = () => {

        const autoClose = () => {
            setTimeout(() => {
                setAlertDisplay("none");
            },10000);
            return true;
        };

        if (!firstname || !lastname || !email || !password) {
            setAlertDisplay("block");
            setAlertMessage("Could not submit, detected invalid input. Please edit and retry. Kindly edit the fields marked red.");
            setWarnSeverity("error");
            autoClose();
            return false;
        }

        
        setBlurDisplay("block");
        setBlurMessage("Please wait while your account is beign created, this may take a few seconds");
        
        const d = JSON.stringify({ firstname: firstname, lastname: lastname, email: email, password: password, type: "register" });
        
        axios.get('/api/users/?q=' + d).then(res => {
            console.log(res.data);
            const jsn = res.data;
            if (jsn.found) {
                cookie.set("email", email);
                setWarnSeverity("success");
                setBlurMessage("Your 14 digit code is " + jsn.code + " and Your four digit PIN is " + jsn.pin + ". Log onto the dashboard for info");
                router.push(`/users/${firstname}`);
            } else {
                setBlurDisplay("none");
                setAlertMessage("Sorry, we couldn't complete your registration, please try again later.");
                setAlertDisplay("block");
                autoClose();
                setWarn("block");
                setWarnSeverity("error");
                setBlurDisplay("none");
            }
        });
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <div style={{ "width": "300px", "marginLeft": "auto", "marginRight": "auto" }}>
                    <Typography className={classes.info, classes.ml_30} variant="h5" gutterBottom>
                        
                    </Typography>
                    <Typography className={classes.ml_30} variant="button" display="block" gutterBottom>create free account</Typography>
                    <Alert severity={warnSeverity}>{warning}</Alert>
                    <TextField
                        error={firstnameError}
                        style={{ width: "300px" }}
                        required
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        inputProps={{ type: "text" }}
                        onInput={(e) => { checkFirstName(e.target.value) }}
                    />
                    <TextField
                        error={lastnameError}
                        required
                        style={{ width: "300px" }}
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        inputProps={{ type: "text" }}
                        onInput={(e) => { checkLastName(e.target.value) }}
                    />
                    <TextField
                        error={emailError}
                        required
                        style={{ width: "300px" }}
                        fullWidth
                        label="Email"
                        variant="outlined"
                        inputProps={{ type: "email" }}
                        onInput={(e) => { checkEmail(e.target.value) }}
                    />

                    <TextField
                        error={passwordError}
                        required
                        fullWidth
                        style={{ width: "300px" }}
                        label="Password"
                        variant="outlined"
                        inputProps={{ type: "password" }}
                        onInput={(e) => { checkPassword(e.target.value) }}
                    />

                    <Button
                        onClick={handler} fullWidth
                        display="block" variant="contained"
                        style={{ width: "300px", "marginLeft": "8px" }}
                        color="primary">
                        Create account
                    </Button>


                    <p className="description">
                        <div className="title">
                            <Typography variant="body1" display="block" gutterBottom>
                                Already have account{' '}
                                <Link href="/login">
                                    <a>login</a>
                                </Link>
                            </Typography>
                        </div>
                    </p>
                </div>
            </form>

            <div
                style={{
                    "display": alertDisplay, "position": "fixed", "top": "200px", "left": "calc(50vw - 100px)",
                    "width": "200px", "height": "100px", "backgroundColor": "black", "color": "#ffff", "zIndex": 100000000000,
                    "padding": "15px", "borderRadius": "10px", "paddingTop": "25px", "paddingBottom": "25px"
                }}>
                <Typography variant="caption">{alertMessage}</Typography>
            </div>
            <div
                style={{
                    "display": blurDisplay, "position": "fixed", "top": "200px", "left": "calc(50vw - 100px)",
                    "width": "200px", "height": "100px", "backgroundColor": "#ffff", "zIndex": 10000000001,
                    "padding": "15px", "borderRadius": "10px", "paddingTop": "25px", "paddingBottom": "25px"
                }}>
                <Typography variant="caption">{blurMessage}</Typography>
            </div>
            <div 
              style={{ "display": blurDisplay, "position": "fixed", "top": "0px", "left": "0px", 
              "width": "100vw", "height": "100vh", "opacity": .5, "backgroundColor": "black", 
              "zIndex": 1000000 }}>
            </div>

        </div>
    );
}
