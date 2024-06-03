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
import AddClass from './AddClasses';
import { useGlobalActions } from '../../context/GlobalStateContext';
import { Teacher } from '../../models/Teacher';
import { Student } from '../../models/Student';


interface ItemClassProps {
    id?: number;
    name: string;
    subject: string;
    teacher: Teacher;
    students: Student[];
}

export function ItemClass({ id, name, subject, teacher, students }: ItemClassProps) {

    const { deleteClass } = useGlobalActions();
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
        navigate(`/classes/${id}`);
    };

    const handleDelete = (id: number) => {
        deleteClass(id)
    };

    return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h6" component="div">
                        {name} 
                    </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                    {subject}
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
                title={`Eliminar Clase ${name}`}
                actionButtonLabel='Eliminar'
                body='¿Estás seguro que deseas eliminar esta clase? Esta acción es irreversible...'
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