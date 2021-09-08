import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PasswordInput from './PasswordInput';
import RecipientNumber from './RecipientNumber';
import SendMoneyButton from './SendMoneyButton';
import AmountInput from './AmountInput';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { 
  open_simple_dialogue, 
  close_simple_dialogue, 
  set_balance, 
  set_pin, 
  remove_pin,
  set_alert,
  remove_alert 
} from '../Action'


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['PIN', 'CODE', 'SEND'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <PasswordInput />
      )
    case 1:
      return (
        <RecipientNumber />
      )
    case 2:
      return (
        <AmountInput />
      )
    default:
      return 'Unknown step';
  }
}

export default function SendSteppers() {
  // Need 
  const dispatch = useDispatch();
  const amount = useSelector(state => state.movingAmountReducer);
  const code = useSelector(state => state.codeReducer);
  const pin = useSelector(state => state.pinReducer);
  const email = Cookie.get("email") || false;
  const [blurDisplay, setBlurDisplay] = useState("none");
  const [blurMessage, setBlurMessage] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");
  const [alertMessage, setAlertMessage] = useState("");


  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);

  const autoClose = () => {
    setTimeout(() => {
        setAlertDisplay("none");
    },10000);
    return true;
  };

  const steps = getSteps();

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep == 2) {
      if(!pin){
        setAlertMessage("Please enter valid PIN");
        setAlertDisplay("block");
        autoClose();
      }

      if(!code){
        setAlertMessage("Please enter beneficiary 14 digit code");
        setAlertDisplay("block");
        autoClose();
      }

      if(!amount){
        setAlertMessage("Please enter valid amount");
        setAlertDisplay("block");
        autoClose();
      }


      setBlurDisplay("block");
      setBlurMessage("Transaction in progress please wait...");
      const d = JSON.stringify({ email: email, type: "send", pin: pin, code: code, amount: amount });

      axios.get('/api/users/?q=' + d).then(res => {
        setBlurDisplay("none");
        const jsn = res.data;
        if (jsn.sent) {
          dispatch(set_balance(jsn.balance));
          
          setAlertMessage("Transfer was successful, balance is now $" + jsn.balance);
          setAlertDisplay("block");
          autoClose();
        } else {
          setAlertMessage("Transaction failed, Reason: "+jsn.reason);
          setAlertDisplay("block");
          autoClose();
        }
      }).finally(() => {
        setBlurDisplay("none");
      });

    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  

  return (
    <div className={classes.root}>

      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ "marginLeft": "auto", "marginRight": "auto", "marginTop": "30px", "width": "300px" }}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button} activity="reset">
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                activity={activeStep === steps.length - 1 ? "final" : "hasNext"}
              >
                {activeStep === steps.length - 1 ? 'Send Money' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          "display": alertDisplay, "position": "fixed", "top": "200px", "left": "calc(50vw - 100px)",
          "width": "200px", "height": "100px", "backgroundColor": "black", "color": "#ffff", 
          "zIndex": 100002,
          "padding": "15px", "borderRadius": "10px", "paddingTop": "25px", "paddingBottom": "25px"
        }}>
        <Typography variant="caption">{alertMessage}</Typography>
      </div>
      <div
        style={{
          "display": blurDisplay, "position": "fixed", "top": "200px", "left": "calc(50vw - 100px)",
          "width": "200px", "height": "100px", "backgroundColor": "#ffff", "zIndex": 100001,
          "padding": "15px", "borderRadius": "10px", "paddingTop": "25px", "paddingBottom": "25px"
        }}>
        <Typography variant="caption">{blurMessage}</Typography>
      </div>
      <div 
        style={{ "display": blurDisplay, "position": "fixed", "top": "0px", "left": "0px", 
        "width": "100vw", "height": "100vh", "opacity": .5, "backgroundColor": "black", 
        "zIndex": 100000 
        }}>
      </div>

    </div>
  );
}
