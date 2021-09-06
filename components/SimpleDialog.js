import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

/*
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
*/

import { useSelector } from 'react-redux';

export default function AlertDialog() {

  const dialogueState = useSelector(state => state.simpleDialogueReducer);
  const message = useSelector(state => state.alertMessageRuducer);

  return (
    <div>
      
      <Dialog
        open={ true }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { message }
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

