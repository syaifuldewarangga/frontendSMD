import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DeleteDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete this data ?"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this data
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button 
                    onClick={() => props.handleDialog(false)}
                >
                        Cancel
                </Button>
                <Button 
                    onClick={() => props.handleDelete(props.id)}
                    autoFocus
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog
