import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Button, Typography } from '@mui/material';
import { Student } from '../../models/Student';
import { useGlobalActions, useGlobalState } from '../../context/GlobalStateContext';

interface AssignStudentsProps {
  classId: number;
  assignedStudents: Student[];
  onClose: () => void;
}

const AssignStudents: React.FC<AssignStudentsProps> = ({ classId, assignedStudents, onClose }) => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const { students } = useGlobalState();
  const { assignStudents } = useGlobalActions();

  useEffect(() => {
    // Marcar como seleccionados los estudiantes ya asignados
    const assignedIds = assignedStudents.map((student) => student.id);
    setSelectedStudents(assignedIds);
  }, [assignedStudents]);

  const handleToggle = (studentId: number) => () => {
    const selectedIndex = selectedStudents.indexOf(studentId);
    const newSelected: number[] = [...selectedStudents];

    if (selectedIndex === -1) {
      newSelected.push(studentId);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedStudents(newSelected);
  };

  const handleAssignStudents = () => {
    assignStudents(classId, selectedStudents);
    onClose();
  };

  return (
    <>
      <Typography>Selecciona uno o más estudiantes para asignar a esta clase</Typography>
      <List>
        {students.map((student) => {
          const labelId = `checkbox-list-label-${student.id}`;

          return (
            <ListItem key={student.id} role={undefined} dense button onClick={handleToggle(student.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedStudents.indexOf(student.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${student.firstName} ${student.lastName}`} />
            </ListItem>
          );
        })}
      </List>
      <Button onClick={handleAssignStudents}>Asignar estudiantes</Button>
    </>
  );
};

export default AssignStudents;
