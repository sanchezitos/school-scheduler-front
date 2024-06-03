import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import { Class } from '../../models/Class';
import { useGlobalActions } from '../../context/GlobalStateContext';
import './DetailClasses.css';
import CustomizedDialogs from '../common/CustomizedDialogs';
import ChangeTeacher from './ChangeTeacher';
import AsignStudentsComponent from './AsignStudentsComponent';

function ClassDetail() {
    const { fetchClassById, assignStudents } = useGlobalActions();
    const { id } = useParams<{ id: string }>();
    const [clas, setClass] = useState<Class | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openAssignDialog, setOpenAssignDialog] = useState(false);
    const [openChangeTeacherDialog, setOpenChangeTeacherDialog] = useState(false);


    useEffect(() => {
        const fetchClass = async () => {
            try {
                const fetchedClass = await fetchClassById(parseInt(id, 10));
                if (!fetchedClass) {
                    throw new Error('Class not found');
                }
                setClass(fetchedClass);
            } catch (error: any) {
                setError(error.message || 'Error fetching Class details.');
            } finally {
                setLoading(false);
            }
        };

        fetchClass();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }
    const handleOpenAssignDialog = () => {
        setOpenAssignDialog(true);
    };

    const handleCloseAssignDialog = () => {
        setOpenAssignDialog(false);
    };

    const handleOpenChangeTeacherDialog = () => {
        setOpenChangeTeacherDialog(true);
    };

    const handleCloseChangeTeacherDialog = () => {
        setOpenChangeTeacherDialog(false);
    };

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!clas) {
        return <Typography>No class found.</Typography>;
    }

    return (
        <>
            <Card className="class-detail-card">
                <CardContent>
                    <Typography variant="h4" gutterBottom className="class-detail-title">
                        {clas.name}
                    </Typography>
                    <Typography variant="body1" className="class-detail-info">
                        {clas.subject}
                    </Typography>
                    <div className="class-detail-section">
                        <Typography variant="h6" className="class-detail-subtitle">
                            Profesor asignado:
                        </Typography>
                        <Link to={`/teacher/${clas.teacher.id}`} className="class-detail-link">
                            {clas.teacher.firstName} {clas.teacher.lastName}
                        </Link>
                        <Button variant="outlined" color="primary" className="class-detail-button"
                            onClick={handleOpenChangeTeacherDialog}
                        >
                            Cambiar Profesor
                        </Button>
                    </div>
                    <div className="class-detail-section">
                        <Typography variant="h6" className="class-detail-subtitle">
                            Estudiantes inscritos:
                        </Typography>
                        {clas.students.length > 0 ? (
                            clas.students.map((student) => (
                                <Link
                                    key={student.id}
                                    to={`/students/${student.id}`}
                                    className="class-detail-link"
                                >
                                    {student.firstName} {student.lastName}
                                </Link>
                            ))
                        ) : (
                            <Typography className="class-detail-info">
                                Aún no hay estudiantes inscritos
                            </Typography>
                        )}
                        <Button variant="outlined" color="primary" className="class-detail-button"
                            onClick={handleOpenAssignDialog}
                        >
                            Asignar Estudiantes
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <CustomizedDialogs
                open={openAssignDialog}
                onClose={handleCloseAssignDialog}
                title="Asignar Estudiantes"
                body={<AsignStudentsComponent
                    classId={clas.id}
                    assignedStudents={clas.students}
                    onAssignStudents={assignStudents}
                    onClose={handleCloseAssignDialog}
                />}
            />
            <CustomizedDialogs
                open={openChangeTeacherDialog}
                onClose={handleCloseChangeTeacherDialog}
                title="Cambiar Profesor"
                body={<ChangeTeacher
                    classId={clas.id}
                    currentTeacherId={clas.teacher.id}
                    onClose={handleCloseChangeTeacherDialog}
                />}
            />
        </>

    );
}

export default ClassDetail;
