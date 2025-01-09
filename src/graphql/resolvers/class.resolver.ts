import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClassService } from 'src/services/class/class.service';
import { ClassModel } from '../models/class/class.model';
import { CreateClassInput } from '../models/class/create-class.input';
import { UpdateClassInput } from '../models/class/update-class.input';

@Resolver(() => ClassModel)
export class ClassResolver {
  constructor(private classService: ClassService) {}

  @Query(() => ClassModel)
  async getClassById(@Args('id') id: string) {
    return (await this.classService.getClassById(id)).data.class;
  }

  @Query(() => [ClassModel])
  async getAllClasses() {
    return (await this.classService.getAllClasses()).data.classes;
  }

  @Mutation(() => ClassModel)
  async createClass(
    @Args('createClassInput') createClassInput: CreateClassInput,
  ) {
    return (await this.classService.createClass(createClassInput)).data.class;
  }

  @Mutation(() => ClassModel)
  async updateStudent(
    @Args('id') id: string,
    @Args('updateClassInput') updateClassInput: UpdateClassInput,
  ) {
    return (await this.classService.updateClass(id, updateClassInput)).data
      .class;
  }

  @Mutation(() => ClassModel)
  async deletedeleteClass(@Args('id') id: string) {
    return (await this.classService.deleteClass(id)).data.class;
  }
}
