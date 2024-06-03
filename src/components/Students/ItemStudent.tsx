import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import SvgIcon from '@mui/icons-material/Settings';
import CustomizedDialogs from '../common/CustomizedDialogs';
import AddStudent from './AddStudent';
import { useGlobalActions } from '../../context/GlobalStateContext';


interface ItemStudentProps {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
}

export function ItemStudent({ id, firstName, lastName, email }: ItemStudentProps) {

    const { deleteStudent } = useGlobalActions();
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const navigate = useNavigate();

    const handleOpenEditDialog = () => {
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };
    const handleViewClick = () => {
        navigate(`/students/${id}`);
    };

    const handleDelete = (id: number) => {
        deleteStudent(id)
    };

    return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h6" component="div">
                        {firstName} {lastName}
                    </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                    {email}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={1}>
                    <Chip
                        icon={<DoneIcon />}
                        color="success"
                        label="Ver"
                        onClick={handleViewClick}
                        deleteIcon={<DoneIcon />}
                    />
                    <Chip
                        color="secondary"
                        label="Editar"
                        onClick={handleOpenEditDialog}
                        icon={<SvgIcon />}
                    />
                    <Chip
                        color="primary"
                        label="Eliminar"
                        onClick={handleOpenDeleteDialog}
                        onDelete={handleDelete}
                        deleteIcon={<DeleteIcon />}
                        variant="outlined"
                    />
                </Stack>
            </Box>
            <CustomizedDialogs
                title={`Editar usuario ${firstName}`}
                body={<AddStudent
                    initialValues={{ id, firstName, lastName, email }}
                    handleCloseEditDialog={handleCloseEditDialog}
                />}
                open={openEditDialog}
                onClose={handleCloseEditDialog}
            />
            <CustomizedDialogs
                title={`Eliminar usuario ${firstName}`}
                actionButtonLabel='Eliminar'
                body='¿Estás seguro que deseas eliminar este usuario? Esta acción es irreversible...'
                onAction={() => {
                    handleDelete(id)
                    handleCloseDeleteDialog()
                }
                }
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
            />
        </Card>
    );
}