
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import '@fontsource/roboto';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import Cookie from 'js-cookie';
import axios from 'axios';
//import autoAlert from '../utils/autoAlert';
//import AlertDialog from './SimpleDialog';
import { useDispatch, useSelector } from 'react-redux';
import { open_simple_dialogue, close_simple_dialogue, set_message } from '../Action';



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
    ml_20: {
        marginTop: "20px"
    },
    mt_30: {
        marginTop: "30px"
    },
    mt_50: {
        marginTop: "50px"
    },
    mt_150: {
        marginTop: "150px"
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
    centeredBox: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    appNameSmall: {
        fontSize: "17px",
    },
    header: {
        marginTop: "15px",
        marginBottom: "15px"
    },
}));


export default function Login() {

    const dialogueState = useSelector(state => state.simpleDialogueReducer);
    const message = useSelector(state => state.alertMessageRuducer);

    const classes = useStyles();
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [blurDisplay, setBlurDisplay] = useState("none");
    const [blurMessage, setBlurMessage] = useState("");

    const [alertMessage, setAlertMessage] = useState("");
    const [alertDisplay, setAlertDisplay] = useState("none");


    useEffect(() => {
        //ookie.set("email", email);
        console.log(email);
        return () => {
            
        }
    }, [email, password]);

    const autoClose = () => {
        setTimeout(() => {
            setAlertDisplay("none");
        },10000);
        return true;
    };

    const checkEmail = (email) => {
        
        const word = "Please enter valid email address";
        if (!email) {
            setEmail("");
            return false;
        }
        var isEmail = email.match(/(\w+)(@)(\w+)(\.)(\w+)/) != null;
        if (!isEmail) {
            setEmail("");
            return false;
        }

        // Everything good
        setEmail(email);
        return true;
    }

    const checkPassword = (passw) => {
        const word = "Password needs to be up to 6 characters long"; // 4 is overlooked
        if (!passw) {
            setPassword("");
            return false;
        }

        if (passw.length < 4) {
            setPassword("");
            return false;
        }

        // Everything good
        setPassword(passw);
        return true;
    }

    const loginHandler = () => {
        
        if(!email || !password){
            //dispatch(set_message("Checking your credentials, please wait..."));
            //dispatch(open_simple_dialogue());
            console.log("Not email or passw");
            console.log("Dialogue state is "+dialogueState)
            //dispatch(open_simple_dialogue());
            
            return;
        }
        

        const d = JSON.stringify({ email: email, password: password, type: "login" });
        setBlurMessage("Checking your credentials, please wait...");
        setBlurDisplay("block");
        axios.get('/api/users/?q=' + d).then(res => {
            const jsn = res.data;
            if (jsn.found) {
                Cookie.set("email", email);
                setBlurMessage("Login was successful, moving you to dashboard");
                router.push(`/users/${jsn.name}`);
            } else {
                setBlurDisplay("none");
                setAlertMessage("Credentials is invalid");
                setAlertDisplay("block");
                autoClose();
            }
        });
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" email={email}>
                <div className={classes.mt_50} style={{ "width": "300px", "marginLeft": "auto", "marginRight": "auto" }}>

                    <Typography className={classes.ml_30, classes.mt_150} variant="button" display="block" gutterBottom>please login to <span className={classes.appNameSmall}>money app</span></Typography>

                    <TextField
                        style={{ width: "300px" }}
                        required
                        fullWidth
                        display="block"
                        id="email"
                        label="Email"
                        variant="outlined"
                        inputProps={{ type: "email" }}
                        onInput={(e) => { setEmail(e.target.value); checkEmail(e.target.value) }}
                    />

                    <TextField
                        style={{ width: "300px" }}
                        fullWidth
                        required
                        display="block"
                        id="password"
                        label="Password"
                        variant="outlined"
                        inputProps={{ type: "password" }}
                        onInput={(e) => { checkPassword(e.target.value) }}
                    />

                    <Button
                        className={classes.centeredBox, classes.mt_30}
                        style={{ width: "300px", "marginLeft": "8px" }}
                        onClick={ loginHandler }
                        display="block" variant="contained" color="primary">
                        Continue to Login
                    </Button>

                    <p className="description">
                        <div className="title">
                            <Typography variant="body1" display="block" gutterBottom>
                                Already have account?&nbsp;{' '}
                                <Link href="/register">
                                    <a>Register</a>
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
