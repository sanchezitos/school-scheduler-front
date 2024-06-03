import React from 'react';
import './Home.css'; // Importa el archivo CSS
import { Button, Typography } from '@mui/material';


export function Home() {
    return <>
        <Typography variant='h5'>
            Bienvenido a mi aplicación de gestión de notas ¿Que quieres hacer hoy?
        </Typography>
        <Button color="secondary">
            Test Hover
        </Button>
    </>
}