import React, { useState } from 'react';

export default function useAlertDialog() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return [open, handleClickOpen, handleClose, setOpen] as const;
}
