import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialogSuccess(props: any) {
    const { open, handleClickClose,title, customText, redirect, handleClickOkay } =
        props;

    const handleRedirect = () => {
        if (redirect) {
            window.location.href = redirect;
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ borderRadius: '50%' }}
            >
                <DialogTitle id="alert-dialog-title">
                    <span className="green poppins">{title}</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span className="poppins">{customText}</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="poppins"
                        onClick={() => {
                            handleClickOkay();
                            handleRedirect();
                        }}
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
