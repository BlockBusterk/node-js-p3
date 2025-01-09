import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from 'src/dto/student/create-student.dto';
import { UpdateStudentDto } from 'src/dto/student/update-student.dto';
import { Class } from 'src/entities/class.entity';
import { Student } from 'src/entities/student.entity';
import { ErrorResponse } from 'src/errors/ErrorResponse';
import { Like, Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}
  async getAllStudents() {
    try {
      let students = await this.studentRepository.find();
      return {
        status: 'sucess',
        requestedAt: Date.now(),
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
      const student = await this.studentRepository.findOneBy({
        name: createStudentDto.name,
      });
      if (student) {
        throw new ErrorResponse(
          'There is student with that name',
          404,
          createStudentDto,
        );
      }
      const checkClass = await this.classRepository.findOneBy({
        id: createStudentDto.classId,
      });
      if (!checkClass) {
        throw new ErrorResponse(
          'The student must belong to available class',
          404,
        );
      }
      const newStudent = await this.studentRepository.create(createStudentDto);
      await this.studentRepository.save(newStudent);
      return {
        status: 'sucess',
        requestedAt: Date.now(),
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
        console.log('error', error);
        throw new ErrorResponse('An unexpected error occurred', 500);
      }
    }
  }

  async getStudentById(idStudent: string) {
    try {
      const student = await this.studentRepository.findOneBy({ id: idStudent });
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
      const student = await this.studentRepository.findOneBy({ id });
      if (!student) {
        throw new ErrorResponse('This student is not exist', 404);
      }
      let studentName = await this.studentRepository.findBy({
        name: updateStudentDto.name,
      });
      if (studentName.length > 1) {
        throw new ErrorResponse('There is student with that name', 404);
      }
      let classE = await this.classRepository.findOneBy({
        id: updateStudentDto.classId,
      });
      if (!classE) {
        throw new ErrorResponse(
          'The student must belong to available class',
          404,
        );
      }
      const updateStudent = Object.assign(student, updateStudentDto);
      await this.studentRepository.save(updateStudent);
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
      const student = await this.studentRepository.findOneBy({ id });
      if (!student) {
        throw new ErrorResponse('This student is not exist', 404);
      }
      await this.studentRepository.remove(student);
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
      const studentName = String(name || '');

      if (!studentName.trim()) {
        throw new ErrorResponse('Name is required', 404);
      }
      const matchingStudents = await this.studentRepository
        .createQueryBuilder('student')
        .where('student.name ILIKE :name', { name: `%${studentName}%` })
        .getMany();
      // const matchingStudents = students.filter((student: { name: string }) =>
      //   student.name.toLowerCase().includes(studentName.toLowerCase()),
      // );

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
      const className = String(name || '');

      if (!className.trim()) {
        throw new ErrorResponse('Class Name is required', 404);
      }

      const classD = await this.classRepository.findOneBy({ name: Like(className) });
      if (!classD) {
        throw new ErrorResponse('This class is not exist', 404);
      }
      console.log(classD);

      const matchingStudents = await this.studentRepository
        .createQueryBuilder('student')
        .where('student.classId = :classId', { classId: classD.id })
        .getMany();

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
