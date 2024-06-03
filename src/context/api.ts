/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { Student } from '../models/Student';
import { Teacher } from '../models/Teacher';
import { Class } from '../models/Class';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Usa la variable de entorno para la URL base de la API
  headers: {
    'Content-Type': 'application/json',
  },
});

// CRUD functions for Students
export const getStudentById = async (id: number): Promise<Student> => {
  try {
    const response = await api.get(`/students/${id}`);
    if (!response.data) {
      throw new Error('Student not found');
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getStudents = async (): Promise<Student[]> => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createStudent = async (userData: Student): Promise<Student> => {
  try {
    const response = await api.post('/students', userData);
    return response.data;
  } catch (error: any) {

    throw new Error(error);
  }
};

export const UpdateStudent = async (studentId: number, userData: Student): Promise<Student> => {
  try {
    const response = await api.put(`/students/${studentId}`, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const DeleteStudent = async (studentId: number): Promise<Student> => {
  try {
    const response = await api.delete(`/students/${studentId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Funciones CRUD para Profesores
export const getTeacherById = async (id: number): Promise<Teacher> => {
  try {
    const response = await api.get(`/teachers/${id}`);
    if (!response.data) {
      throw new Error('Student not found');
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getTeachers = async (): Promise<Teacher[]> => {
  try {
    const response = await api.get('/teachers');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createTeachers = async (teacherData: Teacher): Promise<Teacher> => {
  try {
    const response = await api.post('/teachers', teacherData);
    return response.data;
  } catch (error: any) {

    throw new Error(error);
  }
};

export const UpdateTeacher = async (teacherId: number, teacherData: Teacher): Promise<Student> => {
  try {
    const response = await api.put(`/teachers/${teacherId}`, teacherData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const DeleteTeacher = async (teacherId: number): Promise<Teacher> => {
  try {
    const response = await api.delete(`/teachers/${teacherId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Funciones CRUD para Clases
export const getClassById = async (id: number): Promise<Class> => {
  try {
    const response = await api.get(`/classes/${id}`);
    if (!response.data) {
      throw new Error('Class not found');
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getClasses = async (): Promise<Class[]> => {
  try {
    const response = await api.get('/classes');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createClass = async (classData: Class): Promise<Class> => {
  try {
    const response = await api.post('/teachers', classData);
    return response.data;
  } catch (error: any) {

    throw new Error(error);
  }
};

export const UpdateClass = async (classId: number, classData: Class): Promise<Class> => {
  try {
    const response = await api.put(`/teachers/${classId}`, classData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const DeleteClass = async (classId: number): Promise<Teacher> => {
  try {
    const response = await api.delete(`/teachers/${classId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const AsignTeacher = async (classId: number, teacherId: number): Promise<Class> => {
  try {
    const response = await api.post(`/classes/${classId}/assign-teacher`, {teacherId});
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const AsignStudents = async (classId: number, studentIds: number[]): Promise<Class> => {
  try {
    const response = await api.post(`/classes/${classId}/assign-students`, {studentIds});
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};