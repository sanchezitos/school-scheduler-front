import { Student } from "./Student";
import { Teacher } from "./Teacher";

export interface Class {
    id?: number;
    name: string;
    subject: string;
    teacher: Teacher;
    students: Student[];
  }