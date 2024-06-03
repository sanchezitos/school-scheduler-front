import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface CustomizedDialogsProps {
    open: boolean;
    onClose: () => void;
    onAction?: () => void;
    title: string;
    body: React.ReactNode;
    actionButtonLabel?: string;
    actionButtonStyle?: React.CSSProperties;
}

export default function CustomizedDialogs({
    open,
    onClose,
    onAction,
    title,
    body,
    actionButtonLabel,
    actionButtonStyle,
}: CustomizedDialogsProps) {
    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {title}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {body}
            </DialogContent>
            <DialogActions>
                {onAction && actionButtonLabel && (
                    <Button
                        onClick={onAction}
                        style={actionButtonStyle}
                    >
                        {actionButtonLabel}
                    </Button>
                )}
            </DialogActions>
        </BootstrapDialog>
    );
}
