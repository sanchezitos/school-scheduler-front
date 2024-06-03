import React from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import { useGlobalState } from '../../context/GlobalStateContext';
import { Link as RouterLink } from 'react-router-dom';

import './Students.css';
import { ItemStudent } from '../../components/Students/ItemStudent';

export default function Students() {
    const { students } = useGlobalState()

    return (
        <Container className="estudiantes-container">
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Typography variant="h4" className="estudiantes-title">Estudiantes</Typography>
                <Button
                    component={RouterLink}
                    to="/students/add"
                   // state={addStudent}
                    variant="contained"
                    color="primary"
                    className="estudiantes-button"
                >
                    Agregar estudiante
                </Button>
            </Stack>

            <Stack direction="column" marginTop={2} justifyContent="flex-start" spacing={2}>
                {students.map(student => (
                    <ItemStudent
                        email={student.email}
                        firstName={student.firstName}
                        lastName={student.lastName}
                        id={student.id} />
                ))}
            </Stack>



        </Container>
    );
}

