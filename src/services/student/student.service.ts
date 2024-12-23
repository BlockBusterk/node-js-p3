import { Body, Injectable } from '@nestjs/common';
import { CreateStudentDto } from 'src/dto/student/create-student.dto';
import { UpdateStudentDto } from 'src/dto/student/update-student.dto';
import { ErrorResponse } from 'src/errors/ErrorResponse';
import {
  checkClassById,
  checkClassByName,
  checkStudentById,
  checkStudentByName,
  generateRandomID,
  readJsonFileAsync,
  writeData,
} from 'src/utils/utils';

const studentPath = '../../data/students.json';

@Injectable()
export class StudentService {
  async getAllStudents() {
    try {
      let students = readJsonFileAsync(studentPath);
      return {
        status: 'sucess',
        requestedAt: Date.now(),
        count: students.length,
        data: {
          students: students,
        },
      };
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error; // Re-throw the original ErrorResponse
      } else {
        // If it's not an ErrorResponse, create a new one
        console.log(error);
        throw new ErrorResponse('An unexpected error occurred', 500);
      }
    }
  }

  async createStudent(createStudentDto: CreateStudentDto) {
    try {
      let students = readJsonFileAsync(studentPath);
      const student = checkStudentByName(createStudentDto.name);
      if (student) {
        throw new ErrorResponse(
          'There is student with that name',
          404,
          createStudentDto,
        );
      }
      if (!checkClassById(createStudentDto.classId)) {
        throw new ErrorResponse(
          'The student must belong to available class',
          404,
        );
      }
      const newStudent = {
        id: generateRandomID('stu', 8),
        ...createStudentDto,
      };
      students.push(newStudent);
      writeData(studentPath, students);
      return {
        status: 'sucess',
        requestedAt: Date.now(),
        count: students.length,
        data: {
          student: newStudent,
        },
      };
    } catch (error) {
      // Handle ErrorResponse and non-ErrorResponse errors differently
      if (error instanceof ErrorResponse) {
        throw error; // Re-throw the original ErrorResponse
      } else {
        // If it's not an ErrorResponse, create a new one
        throw new ErrorResponse('An unexpected error occurred', 500);
      }
    }
  }

  async getStudentById(id: string) {
    try {
      const student = checkStudentById(id);
      if (!student) {
        throw new ErrorResponse('This student is not exist', 404);
      }
      return {
        status: 'sucess',
        requestedAt: Date.now(),
        data: {
          student: student,
        },
      };
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error; // Re-throw the original ErrorResponse
      } else {
        // If it's not an ErrorResponse, create a new one
        throw new ErrorResponse('An unexpected error occurred', 500);
      }
    }
  }

  async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
    try {
      let students = readJsonFileAsync(studentPath);
      const student = checkStudentById(id);
      const index = students.map(e => e.id).indexOf(id);
      console.log("student", student)
      console.log("index",index)
      if (!student) {
        throw new ErrorResponse('This student is not exist', 404);
      }
      let studentName = students.find(
        (el: { name: string; id: string }) =>
          el.name === updateStudentDto.name && el.id !== id,
      );
      if (studentName) {
        throw new ErrorResponse('There is student with that name', 404);
      }
      if (!checkClassById(updateStudentDto.classId)) {
        throw new ErrorResponse(
          'The student must belong to available class',
          404,
        );
      }
      const updateStudent = Object.assign(student, updateStudentDto);
      
      students[index] = updateStudent;
      writeData(studentPath, students);
      return {
        status: 'sucess',
        requestedAt: Date.now(),
        data: {
          student: updateStudent,
        },
      };
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error; // Re-throw the original ErrorResponse
      } else {
        // If it's not an ErrorResponse, create a new one
        throw new ErrorResponse('An unexpected error occurred', 500);
      }
    }
  }

  async deleteStudent(id: string) {
    try {
      let students = readJsonFileAsync(studentPath);
      const student = checkStudentById(id);
      if (!student) {
        throw new ErrorResponse('This student is not exist', 404);
      }
      const index = students.map(e => e.id).indexOf(id);
      students.splice(index, 1);
      writeData(studentPath, students);
      return {
        status: 'sucess',
        requestedAt: Date.now(),
        data: {
          student: student,
        },
      };
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error; // Re-throw the original ErrorResponse
      } else {
        // If it's not an ErrorResponse, create a new one
        throw new ErrorResponse('An unexpected error occurred', 500);
      }
    }
  }

  async getStudentByName(name: string) {
    try {
      let students = readJsonFileAsync(studentPath);
      const studentName = String(name || '');

      if (!studentName.trim()) {
        throw new ErrorResponse('Name is required', 404);
      }

      const matchingStudents = students.filter((student: { name: string }) =>
        student.name.toLowerCase().includes(studentName.toLowerCase()),
      );

      if (matchingStudents.length === 0) {
        throw new ErrorResponse('No student found with that name', 404);
      }
      return {
        status: 'sucess',
        requestedAt: Date.now(),
        data: {
          student: matchingStudents,
        },
      };
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error; // Re-throw the original ErrorResponse
      } else {
        // If it's not an ErrorResponse, create a new one
        throw new ErrorResponse('An unexpected error occurred', 500);
      }
    }
  }

  async getStudentByClassName(name: string) {
    try {
      let students = readJsonFileAsync(studentPath);
      const className = String(name || '');

      if (!className.trim()) {
        throw new ErrorResponse('Name is required', 404);
      }

      const classD = checkClassByName(className);
      if (!classD) {
        throw new ErrorResponse('This class is not exist', 404);
      }

      const matchingStudents = students.filter(
        (student: { classId: string }) => classD.id === student.classId,
      );

      if (matchingStudents.length === 0) {
        throw new ErrorResponse('No student found with that class', 404);
      }

      return {
        status: 'sucess',
        requestedAt: Date.now(),
        data: {
          student: matchingStudents,
        },
      };
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error; // Re-throw the original ErrorResponse
      } else {
        // If it's not an ErrorResponse, create a new one
        throw new ErrorResponse('An unexpected error occurred', 500);
      }
    }
  }
}
