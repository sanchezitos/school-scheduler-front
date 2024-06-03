import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import { Student } from '../../models/Student';
import { useGlobalActions } from '../../context/GlobalStateContext';
import dayjs from 'dayjs';


function StudentDetail() {
    const { fetchStudentById } = useGlobalActions()
    const { id } = useParams<{ id: string }>();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const fetchedStudent = await fetchStudentById(parseInt(id, 10));
                if (!fetchedStudent) {
                    throw new Error('Student not found');
                }
                setStudent(fetchedStudent);
            } catch (error: any) {
                setError(error.message || 'Error fetching student details.');
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!student) {
        return <Typography>No student found.</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {student.firstName} {student.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {student.email}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Creado el: {dayjs(student.createdAt).format('DD-MMM-YYYY, hh:mm A')}
                </Typography>
                {/* Agrega más detalles aquí según sea necesario */}
            </CardContent>
        </Card>
    );
}

export default StudentDetail;
