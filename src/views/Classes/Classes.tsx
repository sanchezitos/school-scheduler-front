import { Container, Typography, Button, Stack } from '@mui/material';
import { useGlobalState } from '../../context/GlobalStateContext';
import { Link as RouterLink } from 'react-router-dom';
import './Classes.css';
import { ItemClass } from '../../components/Classes/ItemClass';

export default function Classes() {
    const { classes } = useGlobalState()

    return (
        <Container className="estudiantes-container">
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Typography variant="h4" className="estudiantes-title">Clases</Typography>
                <Button
                    component={RouterLink}
                    to="/classes/add"
                    variant="contained"
                    color="primary"
                    className="estudiantes-button"
                >
                    Agregar Clase
                </Button>
            </Stack>

            <Stack direction="column" marginTop={2} justifyContent="flex-start" spacing={2}>
                {classes.map(clas => (
                    <ItemClass
                        id={clas.id}
                        name={clas.name}
                        subject={clas.subject}
                        teacher={clas.teacher}
                        students={clas.students}
                    />
                ))}
            </Stack>

        </Container>
    );
}

