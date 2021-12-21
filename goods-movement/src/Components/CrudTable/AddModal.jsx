import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const AddModal = (props) => {
    const {open,handleClose}=props;
    const Form=props.form;

    const [state,setState]=props.state;
    let task=null;

    const setTask=(s)=>{
        task=s;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <Form state={props.state}
                      setTask={setTask}
                      event={props.event}
                      vars={props.vars}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{task();handleClose();}} >
                    {(props.mode?"Добавить":"Изменить")}
                </Button>
                <Button onClick={handleClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddModal;