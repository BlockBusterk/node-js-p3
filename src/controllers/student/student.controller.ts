import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { StudentService } from '../../services/student/student.service';
import { CreateStudentDto } from 'src/dto/student/create-student.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Fetch all students
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','principal','teacher')  
  @Get()
  async getAllStudents() {
    return await this.studentService.getAllStudents();
  }

  // Add a new student
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','teacher')
  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.createStudent(createStudentDto);
  }

  // Fetch a student by ID
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','teacher')
  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    return await this.studentService.getStudentById(id);
  }

  // Update student details
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','teacher')
  @Patch(':id')
  async updateStudent(@Param('id') id: string, @Body() updateStudentDto: any) {
    return await this.studentService.updateStudent(id, updateStudentDto);
  }

  // Delete a student
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','teacher')
  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return await this.studentService.deleteStudent(id);
  }

  // Filter students by name
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','principal','teacher')
  @Get('search/by-name')
  async getStudentByName(@Query('name') name: string) {
    return await this.studentService.getStudentByName(name);
  }

  // Filter students by class name
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','principal','teacher')
  @Get('search/by-class')
  async getStudentByClassName(@Query('className') className: string) {
    return await this.studentService.getStudentByClassName(className);
  }
}
