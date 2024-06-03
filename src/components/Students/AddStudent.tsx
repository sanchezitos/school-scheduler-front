import React, { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Typography, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGlobalActions } from '../../context/GlobalStateContext';

interface AddStudentProps {
  initialValues?: {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
  };
  handleCloseEditDialog?: () => void;
}

function AddStudent({ initialValues, handleCloseEditDialog }: AddStudentProps) {

  const { addStudent, updateStudent } = useGlobalActions();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    // Si se proporcionan valores iniciales, establecer los campos del formulario con esos valores
    if (initialValues) {
      setFirstName(initialValues.firstName);
      setLastName(initialValues.lastName);
      setEmail(initialValues.email);
    }
  }, [initialValues]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);

      const studentData = { firstName, lastName, email };

      if (initialValues) {
        // Si se proporcionan valores iniciales, significa que estamos editando un estudiante
        await updateStudent(initialValues.id!, studentData);


      } else {
        // Si no se proporcionan valores iniciales, significa que estamos agregando un nuevo estudiante
        await addStudent(studentData);
      }

      setSuccess(true);
    } catch (error) {
      setError('Error al guardar el estudiante. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
    if (handleCloseEditDialog) {
      handleCloseEditDialog();
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>{initialValues ? 'Editar Usuario' : 'Agregar Usuario'}</Typography>
        {success && <Typography variant="body1" color="success">{initialValues ? 'Usuario editado exitosamente' : 'Usuario agregado exitosamente'}</Typography>}
        {error && <Typography variant="body1" color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            margin="normal"
          />

          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Guardando...' : initialValues ? 'Guardar Cambios' : 'Agregar Usuario'}
            </Button>
            {!initialValues && <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)} // Navega a la página anterior
            >
              Regresar
            </Button>}

          </CardActions>


        </form>
      </CardContent>
    </Card>
  );
}

export default AddStudent;
