import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentModel } from "../models/student/student.model";
import { StudentService } from "src/services/student/student.service";
import { CreateStudentInput } from "../models/student/create-student.input";
import { UpdateStudentInput } from "../models/student/update-student.input";


@Resolver(() => StudentModel)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
  ) {}

  @Query(() => StudentModel)
  async getStudentById(@Args('id') id: string) {
    return (await this.studentService.getStudentById(id)).data.student;
  }

  @Query(() => [StudentModel])
  async getStudentByName(@Args('name') name: string) {
    return (await this.studentService.getStudentByName(name)).data.student;
  }

  @Query(() => [StudentModel])
  async getStudentByClassName(@Args('classId') classId: string) {
    return (await this.studentService.getStudentByName(classId)).data.student;
  }


  @Query(() => [StudentModel])
  async getAllStudents() {
    return (await this.studentService.getAllStudents()).data.students;
  }


  @Mutation(() => StudentModel)
  async createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return (await this.studentService.createStudent(createStudentInput)).data.student;
  }

  @Mutation(() => StudentModel)
  async updateStudent(@Args('id') id: string , @Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return (await this.studentService.updateStudent(id,updateStudentInput)).data.student;
  }

  @Mutation(() => StudentModel)
  async deletedeleteStudent(@Args('id') id: string ) {
    return (await this.studentService.deleteStudent(id)).data.student;
  }


  


//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
}
