import React from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import { useGlobalState } from '../../context/GlobalStateContext';
import { Link as RouterLink } from 'react-router-dom';
import './Teachers.css';
import { ItemTeacher } from '../../components/Teachers/ItemTeacher';

export default function Teachers() {
    const { teachers } = useGlobalState()

    return (
        <Container className="estudiantes-container">
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Typography variant="h4" className="estudiantes-title">Profesores</Typography>
                <Button
                    component={RouterLink}
                    to="/teachers/add"
                   // state={addTeacher}
                    variant="contained"
                    color="primary"
                    className="estudiantes-button"
                >
                    Agregar profesor
                </Button>
            </Stack>

            <Stack direction="column" marginTop={2} justifyContent="flex-start" spacing={2}>
                {teachers.map(teacher => (
                    <ItemTeacher
                        email={teacher.email}
                        firstName={teacher.firstName}
                        lastName={teacher.lastName}
                        id={teacher.id} />
                ))}
            </Stack>

        </Container>
    );
}

