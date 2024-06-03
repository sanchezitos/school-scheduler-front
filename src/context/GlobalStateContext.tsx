import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Student } from "../models/Student";
import {
  DeleteStudent,
  UpdateStudent,
  createStudent,
  getStudentById,
  getStudents,
  getTeachers,
  DeleteTeacher,
  UpdateTeacher,
  createTeachers,
  getTeacherById,
  getClasses,
  DeleteClass,
  UpdateClass,
  createClass,
  getClassById,
  AsignTeacher,
  AsignStudents
} from "./api";
import { useSnackbar } from "./SnackBarContext";
import { AxiosError } from 'axios'; // Asegúrate de importar AxiosError para el tipado adecuado
import { Teacher } from "../models/Teacher";
import { Class } from "../models/Class";



interface GlobalState {
  students: Student[];
  teachers: Teacher[];
  classes: Class[];
}
interface GlobalActions {
  fetchStudentById: (id: number) => Promise<Student>
  fetchStudents: () => Promise<void>;
  addStudent: (student: Student) => Promise<Student>
  updateStudent: (id: number, student: Student) => Promise<void>
  deleteStudent: (id: number) => Promise<void>
  fetchTeacherById: (id: number) => Promise<Student>
  fetchTeachers: () => Promise<void>
  addTeacher: (student: Student) => Promise<Student>
  updateTeacher: (id: number, student: Student) => Promise<void>
  deleteTeacher: (id: number) => Promise<void>
  fetchClassById: (id: number) => Promise<Student>
  fetchClasses: () => Promise<void>
  addClass: (student: Student) => Promise<Student>
  updateClass: (id: number, student: Student) => Promise<void>
  deleteClass: (id: number) => Promise<void>
  asignTeacher: (classId: number, teacherId: number) => Promise<void>
  assignStudents: (classId: number, studentIds: number[]) => Promise<void>
}

// Crea el contexto de estado global
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);
const GlobalActionsContext = createContext<GlobalActions | undefined>(undefined);


// Hook personalizado para acceder al contexto de estado global
export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState debe ser utilizado dentro de un GlobalStateProvider');
  }
  return context;
};
export const useGlobalActions = (): GlobalActions => {
  const context = useContext(GlobalActionsContext);
  if (!context) {
    throw new Error('useGlobalActions debe ser utilizado dentro de un GlobalStateProvider');
  }
  return context;
};

// Proveedor de contexto de estado global
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  const { showMessage } = useSnackbar();

  /*
 const [classes, setClasses] = useState<Class[]>([]); */

  useEffect(() => {
    fetchStudents();
    fetchTeachers()
    fetchClasses()
  }, []);
  // Funciones CRUD para estudiantes
  const fetchStudents = async () => {
    try {
      const studentsData = await getStudents();
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  const fetchStudentById = async (id: number) => {
    try {
      const studentData = await getStudentById(id);
      return studentData
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }
  const addStudent = async (student: Student) => {
    try {
      const newStudent = await createStudent(student);
      setStudents(prevStudents => [...prevStudents, newStudent]);
      showMessage('Estudiante agregado correctamente!', 'success');
      return newStudent


    } catch (error) {
      console.error('Error adding student:', error.message);
      if (error.isAxiosError) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Error adding student axiosError:', axiosError.response);
          if (axiosError.response.status === 409) {
            showMessage('El estudiante ya existe...', 'error');
          } else {
            showMessage('El estudiante no pudo ser agregado...', 'error');
          }
        } else {
          showMessage('Error de red o servidor...', 'error');
        }
      } else {
        showMessage('Error inesperado...', 'error');
      }

      throw error;
    }
  };
  const updateStudent = async (id: number, studentData: Student) => {
    try {

      await UpdateStudent(id, studentData);
      fetchStudents();
      showMessage('Estudiante actualizado correctamente!', 'success');
    } catch (error) {
      showMessage('Error actualizando...', 'error');
    }
  };
  const deleteStudent = async (id: number) => {
    try {
      await DeleteStudent(id)
      fetchStudents();
      showMessage('Estudiante Elminado correctamente!', 'success');

    } catch (error) {
      showMessage('Error Eliminando estudiante...', 'error');
    }
  }
  // Funciones CRUD para profesores
  const fetchTeachers = async () => {
    try {
      const teacherData = await getTeachers();
      setTeachers(teacherData);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };
  const fetchTeacherById = async (id: number) => {
    try {
      const teacherData = await getTeacherById(id);
      return teacherData
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }
  const addTeacher = async (student: Student) => {
    try {
      const newTeacher = await createTeachers(student);
      setTeachers(prevTeachers => [...prevTeachers, newTeacher]);
      showMessage('Profesor agregado correctamente!', 'success');
      return newTeacher


    } catch (error) {
      console.error('Error adding teacher:', error.message);
      if (error.isAxiosError) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Error adding teacher axiosError:', axiosError.response);
          if (axiosError.response.status === 409) {
            showMessage('El profesor ya existe...', 'error');
          } else {
            showMessage('El profesor no pudo ser agregado...', 'error');
          }
        } else {
          showMessage('Error de red o servidor...', 'error');
        }
      } else {
        showMessage('Error inesperado...', 'error');
      }

      throw error;
    }
  };
  const updateTeacher = async (id: number, teacherData: Student) => {
    try {

      await UpdateTeacher(id, teacherData);
      fetchTeachers();
      showMessage('Profesor actualizado correctamente!', 'success');
    } catch (error) {
      showMessage('Error actualizando...', 'error');
    }
  };
  const deleteTeacher = async (id: number) => {
    try {
      await DeleteTeacher(id)
      fetchTeachers();
      showMessage('Profesor Elminado correctamente!', 'success');

    } catch (error) {
      showMessage('Error Eliminando profesor...', 'error');
    }
  }

  // Funciones CRUD para clases
  const fetchClasses = async () => {
    try {
      const classData = await getClasses();
      setClasses(classData);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };
  const fetchClassById = async (id: number) => {
    try {
      const classData = await getClassById(id);
      return classData
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  }
  const addClass = async (clas: Class) => {
    try {
      const newClass = await createClass(clas);
      setClasses(prevClasses => [...prevClasses, newClass]);
      showMessage('Clase agregada correctamente!', 'success');
      return newClass


    } catch (error) {
      console.error('Error adding class:', error.message);
      if (error.isAxiosError) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Error adding class axiosError:', axiosError.response);
          if (axiosError.response.status === 409) {
            showMessage('El profesor ya existe...', 'error');
          } else {
            showMessage('El profesor no pudo ser agregado...', 'error');
          }
        } else {
          showMessage('Error de red o servidor...', 'error');
        }
      } else {
        showMessage('Error inesperado...', 'error');
      }

      throw error;
    }
  };
  const updateClass = async (id: number, clasData: Class) => {
    try {

      await UpdateClass(id, clasData);
      fetchClasses();
      showMessage('Clase actualizada correctamente!', 'success');
    } catch (error) {
      showMessage('Error actualizando...', 'error');
    }
  };
  const deleteClass = async (id: number) => {
    try {
      await DeleteClass(id)
      fetchClasses();
      showMessage('Clase Elminada correctamente!', 'success');

    } catch (error) {
      showMessage('Error Eliminando clase...', 'error');
    }
  }

  const asignTeacher = async (classId: number, teacherId: number) => {
    try {

      await AsignTeacher(classId, teacherId);
      fetchClasses();
      showMessage('Se actualizó el profesor!', 'success');
    } catch (error) {
      showMessage('Error actualizando...', 'error');
    }
  }
  const assignStudents = async (classId: number, studentIds: number[]) => {
    try {

      await AsignStudents(classId, studentIds);
      fetchClasses();
      showMessage('Se asignaron estudiantes!', 'success');
    } catch (error) {
      showMessage('Error actualizando...', 'error');
    }
  }
  const state: GlobalState = { students, teachers, classes };
  const actions: GlobalActions = {
    fetchStudentById,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    fetchTeacherById,
    fetchTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    fetchClassById,
    fetchClasses,
    addClass,
    deleteClass,
    updateClass,
    asignTeacher,
    assignStudents

  };

  return (
    <GlobalStateContext.Provider value={{ ...state, ...actions }}>
      <GlobalActionsContext.Provider value={actions}>
        {children}
      </GlobalActionsContext.Provider>

    </GlobalStateContext.Provider>
  )

}

export default GlobalStateContext;