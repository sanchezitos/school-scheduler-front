import React, { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Typography, MenuItem } from '@mui/material';
import { Teacher } from '../../models/Teacher';
import { useGlobalActions, useGlobalState } from '../../context/GlobalStateContext';

interface ChangeTeacherProps {
    classId: number;
    currentTeacherId: number;
    onClose: () => void;
}

function ChangeTeacher({ classId, currentTeacherId, onClose }: ChangeTeacherProps) {
    const { asignTeacher } = useGlobalActions();
    const { teachers } = useGlobalState()
    //const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number>(currentTeacherId);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setLoading(true);
            await asignTeacher(classId, selectedTeacherId);
            onClose(); // Close the dialog
        } catch (error: any) {
            console.log("Error catch change teacher....", error)
            setError('Error updating teacher');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Selecciona un nuevo profesor</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                select
                label="Profesor"
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(parseInt(e.target.value, 10))}
                fullWidth
                required
                margin="normal"
            >
                {teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                        {teacher.firstName} {teacher.lastName}
                    </MenuItem>
                ))}
            </TextField>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
        </form>
    );
}

export default ChangeTeacher;
