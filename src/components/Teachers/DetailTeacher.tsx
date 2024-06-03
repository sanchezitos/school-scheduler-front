/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { Teacher } from '../../models/Teacher';
import { useGlobalActions } from '../../context/GlobalStateContext';


function TeacherDetail() {
    const { fetchTeacherById } = useGlobalActions()
    const { id } = useParams<{ id: string }>();
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const fetchedTeacher = await fetchTeacherById(parseInt(id, 10));
                if (!fetchedTeacher) {
                    throw new Error('Teacher not found');
                }
                setTeacher(fetchedTeacher);
            } catch (error: any) {
                setError(error.message || 'Error fetching Teacher details.');
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!teacher) {
        return <Typography>No teacher found.</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {teacher.firstName} {teacher.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {teacher.email}
                </Typography>
                {/* <Typography variant="body1" color="text.secondary" gutterBottom>
                    Creado el: {dayjs(teacher.createdAt).format('DD-MMM-YYYY, hh:mm A')}
                </Typography> */}
                {/* Agrega más detalles aquí según sea necesario */}
            </CardContent>
        </Card>
    );
}

export default TeacherDetail;
