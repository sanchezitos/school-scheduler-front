import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    ClassSync
                </Typography>
                {/* Aquí puedes agregar enlaces para navegar a diferentes vistas */}
                <Button component={RouterLink} to="/" color="inherit" >Inicio </Button>
                <Button component={RouterLink} to="/classes" color="inherit">Clases</Button>
                <Button component={RouterLink} to="/students" color="inherit">Estudiantes</Button>
                <Button component={RouterLink} to="/teachers" color="inherit">Profesores</Button>
            </Toolbar>
        </AppBar>
    );
}

